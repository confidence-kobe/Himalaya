/**
 * Firebase 配置文件
 * 藏文打字练习 - 用户认证与数据同步
 *
 * 使用说明：
 * 1. 访问 https://console.firebase.google.com/
 * 2. 创建新项目或使用现有项目
 * 3. 在项目设置中找到"您的应用"部分
 * 4. 添加Web应用，复制配置信息
 * 5. 将配置信息替换到下面的 firebaseConfig 对象中
 * 6. 启用 Authentication (Email/Password, Google, Anonymous)
 * 7. 启用 Firestore Database
 */

// Firebase 配置对象（需要替换为您自己的配置）
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Firebase功能开关（可以控制是否启用Firebase）
const FIREBASE_ENABLED = false; // 设置为 true 启用Firebase功能

/**
 * Firestore 数据结构
 *
 * users/{userId}
 * ├── profile
 * │   ├── displayName: string
 * │   ├── email: string
 * │   ├── photoURL: string
 * │   ├── createdAt: timestamp
 * │   └── lastLoginAt: timestamp
 * │
 * ├── history
 * │   └── records: array
 * │       └── {id, timestamp, difficulty, wpm, accuracy, duration, chars, errors}
 * │
 * ├── achievements
 * │   └── unlocked: array
 * │       └── {id, name, icon, unlockedAt}
 * │
 * └── settings
 *     ├── theme: "light" | "dark"
 *     └── customTexts: array
 */

// Firestore 集合名称
const COLLECTIONS = {
    USERS: 'users',
    HISTORY: 'history',
    ACHIEVEMENTS: 'achievements',
    SETTINGS: 'settings'
};

// Firebase SDK CDN URLs (使用最新版本)
const FIREBASE_SDK = {
    app: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js',
    auth: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js',
    firestore: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        firebaseConfig,
        FIREBASE_ENABLED,
        COLLECTIONS,
        FIREBASE_SDK
    };
}
