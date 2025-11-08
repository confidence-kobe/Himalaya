/**
 * Firebase 配置文件 - 示例
 * 藏文打字练习 - 用户认证与数据同步
 *
 * 这是一个示例配置文件。要启用Firebase功能，请按照以下步骤操作：
 *
 * 1. 将此文件复制为 firebase-config.js
 * 2. 访问 https://console.firebase.google.com/ 创建或选择项目
 * 3. 在项目设置中获取Web应用配置信息
 * 4. 将下面的占位符替换为您的实际配置
 * 5. 将 FIREBASE_ENABLED 设置为 true
 * 6. 启用 Firebase Authentication (Email/Password, Google, Anonymous)
 * 7. 启用 Firestore Database
 * 8. 配置 Firestore 安全规则（参见 README.md）
 *
 * 注意：
 * - 不要将包含真实配置的 firebase-config.js 提交到公开仓库
 * - firebase-config.js 已经在 .gitignore 中被忽略
 * - 此示例文件可以安全地提交到版本控制
 */

// ========================================
// Firebase 配置对象
// ========================================
// 从 Firebase Console → Project Settings → Your apps → Web app config 获取
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef",
    measurementId: "G-XXXXXXXXXX"  // 可选，用于 Google Analytics
};

// ========================================
// Firebase 功能开关
// ========================================
// 设置为 true 以启用 Firebase 云同步功能
// 设置为 false 则使用本地存储模式（默认）
const FIREBASE_ENABLED = false;

// ========================================
// Firestore 数据结构定义
// ========================================
/**
 * 完整的 Firestore 数据结构：
 *
 * users/{userId}                          // 用户根文档
 * ├── displayName: string                 // 用户昵称
 * ├── email: string                       // 邮箱地址
 * ├── photoURL: string                    // 头像URL
 * ├── isAnonymous: boolean                // 是否匿名账户
 * ├── createdAt: timestamp                // 账户创建时间
 * └── lastLoginAt: timestamp              // 最后登录时间
 *
 * users/{userId}/data/history             // 练习历史记录
 * └── records: array                      // 记录数组
 *     └── {
 *         id: number,                     // 记录ID
 *         timestamp: string,              // 练习时间
 *         difficulty: string,             // 难度等级
 *         wpm: number,                    // 打字速度
 *         accuracy: number,               // 准确率
 *         duration: number,               // 用时（秒）
 *         chars: number,                  // 字符总数
 *         errors: number                  // 错误次数
 *     }
 *
 * users/{userId}/data/achievements        // 成就系统
 * └── unlocked: array                     // 已解锁成就数组
 *     └── {
 *         id: string,                     // 成就ID
 *         name: string,                   // 成就名称
 *         icon: string,                   // 成就图标
 *         unlockedAt: string              // 解锁时间
 *     }
 *
 * users/{userId}/data/settings            // 用户设置
 * ├── theme: string                       // 主题 ("light" | "dark")
 * └── customTexts: array                  // 自定义练习文本
 */

// ========================================
// Firestore 集合名称常量
// ========================================
const COLLECTIONS = {
    USERS: 'users',              // 用户集合
    HISTORY: 'history',          // 历史记录（子集合）
    ACHIEVEMENTS: 'achievements', // 成就（子集合）
    SETTINGS: 'settings'         // 设置（子集合）
};

// ========================================
// Firebase SDK CDN URLs
// ========================================
// 使用 Firebase 10.7.1 版本（稳定版）
const FIREBASE_SDK = {
    app: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js',
    auth: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js',
    firestore: 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
};

// ========================================
// Firestore 安全规则示例
// ========================================
/**
 * 在 Firebase Console → Firestore Database → Rules 中使用以下规则：
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // 用户数据规则：只允许用户访问自己的数据
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *
 *       // 子集合继承相同的权限
 *       match /data/{document=**} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *     }
 *   }
 * }
 */

// ========================================
// 使用说明
// ========================================
/**
 * 快速开始：
 *
 * 1. 复制此文件：
 *    cp firebase-config.example.js firebase-config.js
 *
 * 2. 创建 Firebase 项目：
 *    https://console.firebase.google.com/
 *
 * 3. 启用认证方式：
 *    - Email/Password（推荐）
 *    - Google OAuth（可选）
 *    - Anonymous（可选）
 *
 * 4. 创建 Firestore 数据库：
 *    - 选择测试模式（开发阶段）
 *    - 选择地理位置（推荐 asia-east2 香港）
 *
 * 5. 配置安全规则：
 *    - 使用上面提供的规则模板
 *
 * 6. 获取配置并更新 firebase-config.js：
 *    - Project Settings → Your apps → Config
 *    - 复制配置信息
 *    - 设置 FIREBASE_ENABLED = true
 *
 * 7. 测试功能：
 *    - 刷新应用页面
 *    - 点击右上角登录按钮
 *    - 注册新账号或使用 Google 登录
 *
 * Firebase 免费配额（Spark Plan）：
 * - Firestore: 5万次读取/天，2万次写入/天
 * - Authentication: 无限制
 * - 存储: 1GB
 * - 足够个人使用和中小型应用
 *
 * 隐私和安全：
 * - 所有数据按用户ID隔离
 * - HTTPS 加密传输
 * - Firebase 安全规则保护
 * - 符合 GDPR 标准
 */

// ========================================
// 导出配置
// ========================================
// 如果在 Node.js 环境中使用（开发/测试）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        firebaseConfig,
        FIREBASE_ENABLED,
        COLLECTIONS,
        FIREBASE_SDK
    };
}

// ========================================
// 故障排除
// ========================================
/**
 * 常见问题：
 *
 * Q: Firebase 功能没有启用？
 * A: 确保 FIREBASE_ENABLED 设置为 true
 *
 * Q: 登录时出现"项目不存在"错误？
 * A: 检查 projectId 是否正确配置
 *
 * Q: 无法写入 Firestore？
 * A: 检查安全规则是否正确配置
 *
 * Q: Google 登录不工作？
 * A: 在 Firebase Console → Authentication → Sign-in method 中启用 Google
 *
 * Q: 跨域错误？
 * A: 确保应用运行在 https:// 或 localhost
 *
 * Q: 数据没有同步？
 * A: 检查浏览器控制台是否有错误信息
 *
 * 更多帮助：
 * - Firebase 文档: https://firebase.google.com/docs
 * - 项目 README: ./README.md
 * - GitHub Issues: https://github.com/confidence-kobe/Himalaya/issues
 */
