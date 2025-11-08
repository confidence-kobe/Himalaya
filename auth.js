/**
 * 用户认证管理器
 * 处理Firebase认证、用户状态管理、数据同步
 */

class FirebaseAuthManager {
    constructor() {
        this.auth = null;
        this.db = null;
        this.currentUser = null;
        this.isInitialized = false;
        this.syncEnabled = false;
    }

    /**
     * 初始化 Firebase
     */
    async init() {
        if (!FIREBASE_ENABLED) {
            console.log('🔒 Firebase功能未启用，使用本地存储模式');
            return false;
        }

        try {
            // 动态加载 Firebase SDK
            await this.loadFirebaseSDK();

            // 初始化 Firebase App
            const { initializeApp } = await import(FIREBASE_SDK.app);
            const app = initializeApp(firebaseConfig);

            // 初始化 Firebase Auth
            const { getAuth, onAuthStateChanged } = await import(FIREBASE_SDK.auth);
            this.auth = getAuth(app);

            // 初始化 Firestore
            const { getFirestore } = await import(FIREBASE_SDK.firestore);
            this.db = getFirestore(app);

            // 监听认证状态变化
            onAuthStateChanged(this.auth, (user) => {
                this.handleAuthStateChanged(user);
            });

            this.isInitialized = true;
            console.log('✅ Firebase初始化成功');
            return true;
        } catch (error) {
            console.error('❌ Firebase初始化失败:', error);
            return false;
        }
    }

    /**
     * 动态加载 Firebase SDK
     */
    async loadFirebaseSDK() {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.type = 'module';
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        await loadScript(FIREBASE_SDK.app);
        await loadScript(FIREBASE_SDK.auth);
        await loadScript(FIREBASE_SDK.firestore);
    }

    /**
     * 处理认证状态变化
     */
    async handleAuthStateChanged(user) {
        if (user) {
            console.log('👤 用户已登录:', user.email || user.uid);
            this.currentUser = user;
            this.syncEnabled = true;

            // 更新UI
            this.updateUserUI(user);

            // 同步本地数据到云端
            await this.syncLocalToCloud();

            // 从云端加载数据
            await this.loadFromCloud();

            // 发送登录事件
            window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }));
        } else {
            console.log('👤 用户未登录');
            this.currentUser = null;
            this.syncEnabled = false;

            // 更新UI
            this.updateUserUI(null);

            // 发送登出事件
            window.dispatchEvent(new CustomEvent('userLoggedOut'));
        }
    }

    /**
     * 邮箱密码注册
     */
    async signUpWithEmail(email, password, displayName) {
        if (!this.isInitialized) {
            throw new Error('Firebase未初始化');
        }

        try {
            const { createUserWithEmailAndPassword, updateProfile } = await import(FIREBASE_SDK.auth);

            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // 更新用户资料
            if (displayName) {
                await updateProfile(user, { displayName });
            }

            // 创建用户文档
            await this.createUserDocument(user);

            console.log('✅ 注册成功:', email);
            return { success: true, user };
        } catch (error) {
            console.error('❌ 注册失败:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * 邮箱密码登录
     */
    async signInWithEmail(email, password) {
        if (!this.isInitialized) {
            throw new Error('Firebase未初始化');
        }

        try {
            const { signInWithEmailAndPassword } = await import(FIREBASE_SDK.auth);

            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // 更新最后登录时间
            await this.updateLastLogin(user.uid);

            console.log('✅ 登录成功:', email);
            return { success: true, user };
        } catch (error) {
            console.error('❌ 登录失败:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * Google 登录
     */
    async signInWithGoogle() {
        if (!this.isInitialized) {
            throw new Error('Firebase未初始化');
        }

        try {
            const { signInWithPopup, GoogleAuthProvider } = await import(FIREBASE_SDK.auth);

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            // 创建或更新用户文档
            await this.createUserDocument(user);

            console.log('✅ Google登录成功:', user.email);
            return { success: true, user };
        } catch (error) {
            console.error('❌ Google登录失败:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * 匿名登录
     */
    async signInAnonymously() {
        if (!this.isInitialized) {
            throw new Error('Firebase未初始化');
        }

        try {
            const { signInAnonymously } = await import(FIREBASE_SDK.auth);

            const result = await signInAnonymously(this.auth);
            const user = result.user;

            await this.createUserDocument(user);

            console.log('✅ 匿名登录成功');
            return { success: true, user };
        } catch (error) {
            console.error('❌ 匿名登录失败:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * 登出
     */
    async signOut() {
        if (!this.isInitialized) {
            throw new Error('Firebase未初始化');
        }

        try {
            const { signOut } = await import(FIREBASE_SDK.auth);
            await signOut(this.auth);

            console.log('✅ 登出成功');
            return { success: true };
        } catch (error) {
            console.error('❌ 登出失败:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    /**
     * 创建用户文档
     */
    async createUserDocument(user) {
        const { doc, setDoc, getDoc, serverTimestamp } = await import(FIREBASE_SDK.firestore);

        const userRef = doc(this.db, COLLECTIONS.USERS, user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                displayName: user.displayName || '藏文学习者',
                email: user.email || null,
                photoURL: user.photoURL || null,
                isAnonymous: user.isAnonymous,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp()
            });
            console.log('✅ 用户文档创建成功');
        }
    }

    /**
     * 更新最后登录时间
     */
    async updateLastLogin(uid) {
        const { doc, updateDoc, serverTimestamp } = await import(FIREBASE_SDK.firestore);

        const userRef = doc(this.db, COLLECTIONS.USERS, uid);
        await updateDoc(userRef, {
            lastLoginAt: serverTimestamp()
        });
    }

    /**
     * 同步本地数据到云端
     */
    async syncLocalToCloud() {
        if (!this.syncEnabled || !this.currentUser) return;

        try {
            const { doc, setDoc } = await import(FIREBASE_SDK.firestore);

            // 同步历史记录
            const history = StorageManager.load(CONFIG.STORAGE_KEYS.HISTORY, []);
            if (history.length > 0) {
                const historyRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'history');
                await setDoc(historyRef, { records: history }, { merge: true });
                console.log('✅ 历史记录同步到云端');
            }

            // 同步成就
            const achievements = StorageManager.load(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, []);
            if (achievements.length > 0) {
                const achievementsRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'achievements');
                await setDoc(achievementsRef, { unlocked: achievements }, { merge: true });
                console.log('✅ 成就同步到云端');
            }

            // 同步设置
            const settings = StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS, {});
            if (Object.keys(settings).length > 0) {
                const settingsRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'settings');
                await setDoc(settingsRef, settings, { merge: true });
                console.log('✅ 设置同步到云端');
            }
        } catch (error) {
            console.error('❌ 同步到云端失败:', error);
        }
    }

    /**
     * 从云端加载数据
     */
    async loadFromCloud() {
        if (!this.syncEnabled || !this.currentUser) return;

        try {
            const { doc, getDoc } = await import(FIREBASE_SDK.firestore);

            // 加载历史记录
            const historyRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'history');
            const historySnap = await getDoc(historyRef);
            if (historySnap.exists()) {
                const cloudHistory = historySnap.data().records || [];
                if (cloudHistory.length > 0) {
                    StorageManager.save(CONFIG.STORAGE_KEYS.HISTORY, cloudHistory);
                    console.log('✅ 从云端加载历史记录');
                }
            }

            // 加载成就
            const achievementsRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'achievements');
            const achievementsSnap = await getDoc(achievementsRef);
            if (achievementsSnap.exists()) {
                const cloudAchievements = achievementsSnap.data().unlocked || [];
                if (cloudAchievements.length > 0) {
                    StorageManager.save(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, cloudAchievements);
                    console.log('✅ 从云端加载成就');
                }
            }

            // 加载设置
            const settingsRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', 'settings');
            const settingsSnap = await getDoc(settingsRef);
            if (settingsSnap.exists()) {
                const cloudSettings = settingsSnap.data();
                StorageManager.save(CONFIG.STORAGE_KEYS.SETTINGS, cloudSettings);
                console.log('✅ 从云端加载设置');
            }

            // 触发UI更新
            window.dispatchEvent(new Event('dataLoaded'));
        } catch (error) {
            console.error('❌ 从云端加载失败:', error);
        }
    }

    /**
     * 保存数据到云端（单次操作）
     */
    async saveToCloud(dataType, data) {
        if (!this.syncEnabled || !this.currentUser) return;

        try {
            const { doc, setDoc } = await import(FIREBASE_SDK.firestore);

            const dataRef = doc(this.db, COLLECTIONS.USERS, this.currentUser.uid, 'data', dataType);
            await setDoc(dataRef, data, { merge: true });

            console.log(`✅ ${dataType}保存到云端`);
        } catch (error) {
            console.error(`❌ ${dataType}保存到云端失败:`, error);
        }
    }

    /**
     * 更新用户UI
     */
    updateUserUI(user) {
        const loginBtn = document.getElementById('loginBtn');
        const userProfileBtn = document.getElementById('userProfileBtn');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (user) {
            // 已登录状态
            if (loginBtn) loginBtn.style.display = 'none';
            if (userProfileBtn) userProfileBtn.style.display = 'flex';

            if (userAvatar) {
                userAvatar.src = user.photoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23667eea"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="Arial">👤</text></svg>';
            }

            if (userName) {
                userName.textContent = user.displayName || user.email || '匿名用户';
            }
        } else {
            // 未登录状态
            if (loginBtn) loginBtn.style.display = 'flex';
            if (userProfileBtn) userProfileBtn.style.display = 'none';
        }
    }

    /**
     * 获取友好的错误信息
     */
    getErrorMessage(error) {
        const errorMessages = {
            'auth/email-already-in-use': '该邮箱已被注册',
            'auth/invalid-email': '邮箱格式不正确',
            'auth/operation-not-allowed': '该登录方式未启用',
            'auth/weak-password': '密码强度太弱（至少6位）',
            'auth/user-disabled': '该账户已被禁用',
            'auth/user-not-found': '用户不存在',
            'auth/wrong-password': '密码错误',
            'auth/too-many-requests': '请求过于频繁，请稍后再试',
            'auth/popup-closed-by-user': '登录窗口被关闭',
            'auth/cancelled-popup-request': '登录请求已取消',
            'auth/network-request-failed': '网络连接失败'
        };

        return errorMessages[error.code] || error.message || '发生未知错误';
    }

    /**
     * 获取当前用户
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * 检查是否已登录
     */
    isLoggedIn() {
        return !!this.currentUser;
    }
}

// 创建全局实例
const authManager = new FirebaseAuthManager();
