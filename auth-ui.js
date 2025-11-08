/**
 * 认证UI控制器
 * 处理登录/注册界面交互和用户个人中心
 */

class AuthUIManager {
    constructor() {
        this.authModal = null;
        this.userProfileModal = null;
        this.currentAuthTab = 'login';
    }

    /**
     * 初始化认证UI
     */
    init() {
        this.authModal = document.getElementById('authModal');
        this.userProfileModal = document.getElementById('userProfileModal');

        this.setupEventListeners();
        this.checkFirebaseStatus();

        console.log('✅ 认证UI管理器初始化完成');
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 登录按钮
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openAuthModal());
        }

        // 用户头像按钮
        const userProfileBtn = document.getElementById('userProfileBtn');
        if (userProfileBtn) {
            userProfileBtn.addEventListener('click', () => this.openProfileModal());
        }

        // 认证标签切换
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabType = e.target.dataset.tab;
                this.switchAuthTab(tabType);
            });
        });

        // 登录表单提交
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 注册表单提交
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Google登录按钮
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => this.handleGoogleLogin());
        }

        // 匿名登录按钮
        const anonymousLoginBtn = document.getElementById('anonymousLoginBtn');
        if (anonymousLoginBtn) {
            anonymousLoginBtn.addEventListener('click', () => this.handleAnonymousLogin());
        }

        // 登出按钮
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // 同步数据按钮
        const syncDataBtn = document.getElementById('syncDataBtn');
        if (syncDataBtn) {
            syncDataBtn.addEventListener('click', () => this.handleSyncData());
        }

        // 导出数据按钮
        const exportDataBtn = document.getElementById('exportDataBtn');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => this.handleExportData());
        }

        // 关闭模态框
        this.authModal?.querySelector('.modal-close')?.addEventListener('click', () => {
            this.closeAuthModal();
        });

        this.userProfileModal?.querySelector('.modal-close')?.addEventListener('click', () => {
            this.closeProfileModal();
        });

        // 监听用户登录/登出事件
        window.addEventListener('userLoggedIn', (e) => this.onUserLoggedIn(e.detail));
        window.addEventListener('userLoggedOut', () => this.onUserLoggedOut());
        window.addEventListener('dataLoaded', () => this.updateProfileStats());
    }

    /**
     * 检查Firebase状态
     */
    checkFirebaseStatus() {
        if (!FIREBASE_ENABLED) {
            // 显示本地模式提示
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) {
                loginBtn.title = '本地模式（需配置Firebase启用云同步）';
            }

            // 禁用第三方登录按钮
            document.getElementById('googleLoginBtn')?.setAttribute('disabled', 'true');
            document.getElementById('anonymousLoginBtn')?.setAttribute('disabled', 'true');
        } else {
            // 启用Firebase功能
            document.getElementById('googleLoginBtn')?.removeAttribute('disabled');
            document.getElementById('anonymousLoginBtn')?.removeAttribute('disabled');
        }
    }

    /**
     * 打开登录模态框
     */
    openAuthModal() {
        if (!FIREBASE_ENABLED) {
            this.showMessage('⚠️ Firebase未配置', '需要先配置Firebase才能使用云同步功能。\n当前使用本地存储模式。', 'warning');
            return;
        }

        this.authModal?.classList.remove('hidden');
        this.switchAuthTab('login');
    }

    /**
     * 关闭登录模态框
     */
    closeAuthModal() {
        this.authModal?.classList.add('hidden');
        this.clearAuthForms();
    }

    /**
     * 打开个人中心模态框
     */
    openProfileModal() {
        this.userProfileModal?.classList.remove('hidden');
        this.updateProfileStats();
    }

    /**
     * 关闭个人中心模态框
     */
    closeProfileModal() {
        this.userProfileModal?.classList.add('hidden');
    }

    /**
     * 切换认证标签
     */
    switchAuthTab(tabType) {
        this.currentAuthTab = tabType;

        // 更新标签状态
        document.querySelectorAll('.auth-tab').forEach(tab => {
            if (tab.dataset.tab === tabType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // 显示对应表单
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (tabType === 'login') {
            loginForm?.classList.remove('hidden');
            registerForm?.classList.add('hidden');
        } else {
            loginForm?.classList.add('hidden');
            registerForm?.classList.remove('hidden');
        }

        this.clearAuthForms();
    }

    /**
     * 处理登录
     */
    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        const errorDiv = document.getElementById('loginError');

        if (!email || !password) {
            this.showError(errorDiv, '请填写所有字段');
            return;
        }

        try {
            const result = await authManager.signInWithEmail(email, password);

            if (result.success) {
                this.closeAuthModal();
                this.showMessage('✅ 登录成功', `欢迎回来，${result.user.email}！`, 'success');
            } else {
                this.showError(errorDiv, result.error);
            }
        } catch (error) {
            this.showError(errorDiv, '登录失败，请稍后重试');
            console.error('Login error:', error);
        }
    }

    /**
     * 处理注册
     */
    async handleRegister(e) {
        e.preventDefault();

        const name = document.getElementById('registerName')?.value;
        const email = document.getElementById('registerEmail')?.value;
        const password = document.getElementById('registerPassword')?.value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm')?.value;
        const errorDiv = document.getElementById('registerError');

        if (!name || !email || !password || !passwordConfirm) {
            this.showError(errorDiv, '请填写所有字段');
            return;
        }

        if (password !== passwordConfirm) {
            this.showError(errorDiv, '两次输入的密码不一致');
            return;
        }

        if (password.length < 6) {
            this.showError(errorDiv, '密码至少需要6位');
            return;
        }

        try {
            const result = await authManager.signUpWithEmail(email, password, name);

            if (result.success) {
                this.closeAuthModal();
                this.showMessage('✅ 注册成功', `欢迎加入，${name}！`, 'success');
            } else {
                this.showError(errorDiv, result.error);
            }
        } catch (error) {
            this.showError(errorDiv, '注册失败，请稍后重试');
            console.error('Register error:', error);
        }
    }

    /**
     * 处理Google登录
     */
    async handleGoogleLogin() {
        if (!FIREBASE_ENABLED) return;

        try {
            const result = await authManager.signInWithGoogle();

            if (result.success) {
                this.closeAuthModal();
                this.showMessage('✅ 登录成功', '欢迎使用Google账号登录！', 'success');
            } else {
                this.showMessage('❌ 登录失败', result.error, 'error');
            }
        } catch (error) {
            this.showMessage('❌ 登录失败', '请稍后重试', 'error');
            console.error('Google login error:', error);
        }
    }

    /**
     * 处理匿名登录
     */
    async handleAnonymousLogin() {
        if (!FIREBASE_ENABLED) return;

        try {
            const result = await authManager.signInAnonymously();

            if (result.success) {
                this.closeAuthModal();
                this.showMessage('✅ 登录成功', '您正在使用匿名账户', 'success');
            } else {
                this.showMessage('❌ 登录失败', result.error, 'error');
            }
        } catch (error) {
            this.showMessage('❌ 登录失败', '请稍后重试', 'error');
            console.error('Anonymous login error:', error);
        }
    }

    /**
     * 处理登出
     */
    async handleLogout() {
        const confirm = window.confirm('确定要退出登录吗？');
        if (!confirm) return;

        try {
            if (FIREBASE_ENABLED && authManager.isLoggedIn()) {
                const result = await authManager.signOut();

                if (result.success) {
                    this.closeProfileModal();
                    this.showMessage('✅ 已退出', '您已成功退出登录', 'success');
                } else {
                    this.showMessage('❌ 退出失败', result.error, 'error');
                }
            } else {
                this.closeProfileModal();
                this.showMessage('💡 本地模式', '当前使用本地存储模式', 'info');
            }
        } catch (error) {
            this.showMessage('❌ 退出失败', '请稍后重试', 'error');
            console.error('Logout error:', error);
        }
    }

    /**
     * 处理数据同步
     */
    async handleSyncData() {
        if (!FIREBASE_ENABLED || !authManager.isLoggedIn()) {
            this.showMessage('⚠️ 无法同步', 'Firebase未配置或未登录', 'warning');
            return;
        }

        try {
            await authManager.syncLocalToCloud();
            this.showMessage('✅ 同步成功', '数据已同步到云端', 'success');
        } catch (error) {
            this.showMessage('❌ 同步失败', '请稍后重试', 'error');
            console.error('Sync error:', error);
        }
    }

    /**
     * 处理数据导出
     */
    handleExportData() {
        // 使用现有的HistoryManager.exportData功能
        if (typeof HistoryManager !== 'undefined' && HistoryManager.exportData) {
            HistoryManager.exportData();
        } else {
            this.showMessage('⚠️ 功能不可用', '导出功能未找到', 'warning');
        }
    }

    /**
     * 用户登录后的处理
     */
    onUserLoggedIn(user) {
        console.log('用户已登录:', user);
        this.updateProfileStats();
    }

    /**
     * 用户登出后的处理
     */
    onUserLoggedOut() {
        console.log('用户已登出');
    }

    /**
     * 更新个人中心统计
     */
    updateProfileStats() {
        // 获取统计数据
        const history = StorageManager.load(CONFIG.STORAGE_KEYS.HISTORY, []);
        const achievements = StorageManager.load(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, []);

        // 计算统计
        const totalPractices = history.length;
        const avgWpm = totalPractices > 0
            ? Math.round(history.reduce((sum, r) => sum + r.wpm, 0) / totalPractices)
            : 0;
        const avgAccuracy = totalPractices > 0
            ? Math.round(history.reduce((sum, r) => sum + r.accuracy, 0) / totalPractices)
            : 0;
        const achievementCount = achievements.length;

        // 更新UI
        document.getElementById('profileTotalPractices').textContent = totalPractices;
        document.getElementById('profileAvgWpm').textContent = avgWpm;
        document.getElementById('profileAvgAccuracy').textContent = avgAccuracy + '%';
        document.getElementById('profileAchievements').textContent = `${achievementCount}/12`;

        // 更新用户信息
        const currentUser = FIREBASE_ENABLED ? authManager.getCurrentUser() : null;

        if (currentUser) {
            document.getElementById('profileName').textContent = currentUser.displayName || '用户';
            document.getElementById('profileEmail').textContent = currentUser.email || '未设置';
            document.getElementById('profileAvatar').src = currentUser.photoURL || this.getDefaultAvatar();
            document.getElementById('profileBadge').textContent = currentUser.isAnonymous ? '🔓 匿名账户' : '🔐 已认证';

            // 启用同步按钮
            const syncBtn = document.getElementById('syncDataBtn');
            if (syncBtn) syncBtn.removeAttribute('disabled');
        } else {
            document.getElementById('profileName').textContent = '本地用户';
            document.getElementById('profileEmail').textContent = '使用本地存储';
            document.getElementById('profileAvatar').src = this.getDefaultAvatar();
            document.getElementById('profileBadge').textContent = '🔒 本地账户';

            // 禁用同步按钮
            const syncBtn = document.getElementById('syncDataBtn');
            if (syncBtn) syncBtn.setAttribute('disabled', 'true');
        }

        // 更新时间信息（暂时使用占位符）
        document.getElementById('profileCreatedAt').textContent = '本地数据';
        document.getElementById('profileLastLogin').textContent = new Date().toLocaleString('zh-CN');
    }

    /**
     * 获取默认头像
     */
    getDefaultAvatar() {
        return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23667eea"/><text x="40" y="52" text-anchor="middle" fill="white" font-size="36" font-family="Arial">👤</text></svg>';
    }

    /**
     * 清空认证表单
     */
    clearAuthForms() {
        // 清空登录表单
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();

        // 清空注册表单
        const registerForm = document.getElementById('registerForm');
        if (registerForm) registerForm.reset();

        // 隐藏错误信息
        document.getElementById('loginError')?.classList.add('hidden');
        document.getElementById('registerError')?.classList.add('hidden');
    }

    /**
     * 显示错误信息
     */
    showError(element, message) {
        if (!element) return;
        element.textContent = message;
        element.classList.remove('hidden');
    }

    /**
     * 显示通知消息
     */
    showMessage(title, message, type = 'info') {
        // 使用浏览器原生alert（简单实现）
        alert(`${title}\n\n${message}`);

        // 可以后续替换为更美观的通知组件
        console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    }
}

// 创建全局实例
const authUIManager = new AuthUIManager();

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化Firebase（如果启用）
    if (FIREBASE_ENABLED && typeof authManager !== 'undefined') {
        authManager.init().then(initialized => {
            if (initialized) {
                console.log('🔥 Firebase认证系统已启动');
            }
        });
    }

    // 初始化认证UI
    authUIManager.init();
});
