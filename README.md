# བོད་ཡིག་དཔར་རྡུལ་སྦྱོང་བརྡར། Himalaya 藏文打字练习

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/confidence-kobe/Himalaya)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)](manifest.json)
[![Deploy](https://github.com/confidence-kobe/Himalaya/actions/workflows/deploy.yml/badge.svg)](https://github.com/confidence-kobe/Himalaya/actions/workflows/deploy.yml)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-success.svg)](https://confidence-kobe.github.io/Himalaya/)
[![Code Size](https://img.shields.io/github/languages/code-size/confidence-kobe/Himalaya)](https://github.com/confidence-kobe/Himalaya)
[![Last Commit](https://img.shields.io/github/last-commit/confidence-kobe/Himalaya)](https://github.com/confidence-kobe/Himalaya/commits/main)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-success.svg)](https://github.com/confidence-kobe/Himalaya/graphs/commit-activity)

[![GitHub Issues](https://img.shields.io/github/issues/confidence-kobe/Himalaya)](https://github.com/confidence-kobe/Himalaya/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/confidence-kobe/Himalaya)](https://github.com/confidence-kobe/Himalaya/pulls)
[![GitHub Stars](https://img.shields.io/github/stars/confidence-kobe/Himalaya?style=social)](https://github.com/confidence-kobe/Himalaya/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/confidence-kobe/Himalaya?style=social)](https://github.com/confidence-kobe/Himalaya/network/members)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-semantic-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-modern-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](https://github.com/confidence-kobe/Himalaya/blob/main/package.json)

[![Platform](https://img.shields.io/badge/platform-web-lightgrey.svg)](https://confidence-kobe.github.io/Himalaya/)
[![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Firefox%20%7C%20Safari%20%7C%20Edge-blue.svg)](https://github.com/confidence-kobe/Himalaya#-浏览器兼容性)
[![Mobile](https://img.shields.io/badge/mobile-iOS%20%7C%20Android-success.svg)](https://confidence-kobe.github.io/Himalaya/)
[![Offline](https://img.shields.io/badge/offline-supported-blueviolet.svg)](https://github.com/confidence-kobe/Himalaya#-pwa特性)

[![Security](https://img.shields.io/badge/security-policy-red.svg)](SECURITY.md)
[![Contributing](https://img.shields.io/badge/contributing-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Changelog](https://img.shields.io/badge/changelog-available-blue.svg)](CHANGELOG.md)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-informational.svg)](CONTRIBUTING.md#-code-of-conduct)

</div>

一个现代化、功能完整的藏文打字练习渐进式Web应用（PWA），帮助用户提高藏文输入速度和准确率。

## ✨ 功能特点

### 🎯 核心功能
- **三种难度等级**：简单、中等、困难，包含45+精选藏文练习文本
- **自定义文本**：支持添加自定义藏文内容进行练习
- **实时统计**：显示WPM（每分钟字符数）、准确率、进度和用时
- **即时反馈**：实时显示正确（绿色）和错误（红色）的字符，当前位置黄色高亮

### 🎨 界面设计
- **深色/浅色模式**：一键切换主题，自动保存偏好设置
- **响应式布局**：完美适配桌面、平板和手机
- **渐变色设计**：紫色主题，现代美观
- **流畅动画**：所有交互都有平滑的过渡效果
- **无障碍访问**：完整的ARIA标签支持，支持键盘导航

### 📊 数据追踪
- **历史记录**：自动保存最近100次练习记录
- **统计图表**：可视化显示最近10次练习的速度趋势
- **数据导出**：支持导出JSON格式的完整历史数据
- **统计摘要**：总练习次数、平均/最高速度、平均/最高准确率

### 🏆 成就系统
- **12种成就**：从"初次尝试"到"百炼成钢"
- **进度追踪**：解锁成就后获得通知
- **成就展示**：查看已解锁和未解锁的所有成就

### 📱 PWA特性
- **离线支持**：Service Worker缓存，无网络也能使用
- **可安装**：添加到主屏幕，像原生应用一样使用
- **快速加载**：资源预缓存，秒开体验
- **推送通知**：（预留接口，可扩展）

### 👤 用户认证与云同步（可选）
- **Firebase集成**：支持邮箱/密码、Google账号、匿名登录
- **跨设备同步**：登录后自动同步练习记录、成就和设置
- **云端备份**：数据安全存储在Firestore云数据库
- **个人中心**：查看统计数据、管理账户、导出数据
- **本地优先**：未配置Firebase时自动使用本地存储模式
- **隐私安全**：完整的安全策略和数据加密

### ⌨️ 用户体验
- **快捷键**：ESC重置，Ctrl/Cmd+Enter开始
- **分享功能**：完成练习后可分享成绩
- **智能提示**：各种操作都有友好的提示信息
- **错误处理**：完善的异常处理和用户反馈

## 🚀 快速开始

### 在线使用

1. 在浏览器中打开 `index.html` 文件
2. （可选）点击右上角图标切换深色模式
3. 选择难度等级（简单/中等/困难/自定义）
4. 点击"开始练习"按钮
5. 在输入框中输入显示的藏文文本
6. 完成后查看详细统计结果和解锁的成就

### 安装为PWA

**Chrome/Edge:**
1. 访问网站后，点击地址栏右侧的"安装"图标
2. 或使用页面底部的安装提示

**Safari (iOS):**
1. 点击分享按钮
2. 选择"添加到主屏幕"

**Firefox:**
1. 菜单 → 安装应用

### 系统要求

- **浏览器**：Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **藏文输入法**：已安装藏文输入法
- **字体支持**：自动加载 Google Fonts 的 Noto Serif Tibetan 字体
- **LocalStorage**：用于保存历史记录和设置（约5MB空间）
- **Firebase**（可选）：用于云同步功能（免费配额充足）

### 🔥 Firebase配置（可选）

如果您想启用跨设备云同步功能，需要配置Firebase：

#### 1. 创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"，输入项目名称
3. 选择是否启用Google Analytics（可选）
4. 等待项目创建完成

#### 2. 获取配置信息

1. 在项目概览中，点击"添加应用" → 选择"Web"
2. 输入应用昵称（如：Himalaya Web）
3. 复制提供的Firebase配置对象
4. 打开 `firebase-config.js` 文件
5. 将配置信息替换到 `firebaseConfig` 对象中
6. 将 `FIREBASE_ENABLED` 设置为 `true`

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

const FIREBASE_ENABLED = true; // 改为true启用
```

#### 3. 启用认证方式

在Firebase Console中：

1. 进入"Authentication"（身份验证）
2. 点击"Get started"
3. 在"Sign-in method"标签页启用需要的登录方式：
   - **Email/Password**（邮箱密码）：最简单，推荐启用
   - **Google**：需要配置OAuth客户端ID
   - **Anonymous**（匿名）：无需额外配置

#### 4. 启用Firestore数据库

1. 进入"Firestore Database"
2. 点击"创建数据库"
3. 选择"以测试模式启动"（开发阶段）
4. 选择Firestore位置（建议选择asia-east2香港）
5. 等待数据库创建完成

#### 5. 安全规则配置

在Firestore的"规则"标签页，使用以下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### 6. 测试配置

1. 刷新应用页面
2. 点击右上角的登录按钮
3. 尝试注册新账号或使用Google登录
4. 登录成功后，数据会自动同步到云端

**注意事项：**
- Firebase免费配额足够个人使用（每月5万次读取、2万次写入）
- 未配置Firebase时，应用自动使用本地存储模式
- 云同步功能完全可选，不影响核心打字练习功能
- 请妥善保管Firebase配置信息，不要提交到公开仓库

## 📝 使用说明

### 藏文输入法设置

**Windows 10/11:**
1. 设置 → 时间和语言 → 语言
2. 添加语言 → 选择"藏语"
3. 安装后使用 `Win+Space` 切换输入法

**macOS:**
1. 系统偏好设置 → 键盘 → 输入法
2. 点击"+"添加"藏文 - Wylie"或"藏文"输入法
3. 使用 `Control+Space` 或 `Command+Space` 切换

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install ibus-m17n m17n-db m17n-contrib
```
然后在 IBus 设置中添加藏文输入法

**Android:**
- 安装 Gboard，在设置中添加藏文键盘

**iOS:**
- 设置 → 通用 → 键盘 → 键盘 → 添加新键盘 → 藏文

### 练习技巧

1. **从简单开始**：如果您是初学者，建议从"简单"难度开始熟悉藏文键位
2. **注重准确率**：先追求100%准确，速度会随着肌肉记忆自然提高
3. **定期练习**：每天练习15-30分钟，持续一周即可看到明显进步
4. **观察反馈**：注意红色标记的错误字符，重点练习这些键位
5. **使用自定义文本**：练习自己常用的藏文内容，实用性更强
6. **查看历史记录**：通过图表了解自己的进步趋势，保持动力

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + Enter` | 开始新的练习 |
| `ESC` | 重置当前练习 / 关闭模态框 |
| `Tab` | 在控件间导航 |

## 📊 数据管理

### 历史记录

所有练习记录自动保存在浏览器的LocalStorage中，包括：
- 练习日期和时间
- 选择的难度级别
- 打字速度（WPM）
- 准确率百分比
- 用时（秒）
- 字符总数
- 错误次数

### 导出数据

点击历史记录页面的"导出数据"按钮，可以下载JSON格式的完整历史记录，包括：
- 所有练习记录
- 统计摘要
- 导出时间戳

### 清除数据

如需清除历史记录：
1. 点击右上角📊图标打开历史记录
2. 点击"清除历史"按钮
3. 确认操作（此操作不可撤销）

## 🏆 成就系统

### 成就列表

| 图标 | 名称 | 条件 |
|------|------|------|
| 🎯 | 初次尝试 | 完成第一次练习 |
| ⚡ | 速度达人 | 打字速度达到10 WPM |
| 🚀 | 快手 | 打字速度达到20 WPM |
| 💫 | 神速 | 打字速度达到30 WPM |
| 🎖️ | 准确高手 | 准确率达到90% |
| 🏅 | 精准大师 | 准确率达到95% |
| 👑 | 完美主义 | 达到100%准确率 |
| 📚 | 勤奋学习 | 完成10次练习 |
| 🔥 | 持之以恒 | 完成50次练习 |
| 💎 | 百炼成钢 | 完成100次练习 |
| 🌟 | 全能选手 | 在所有难度完成练习 |
| ✏️ | 个性化 | 使用自定义文本练习 |

## 🎯 难度说明

### 简单（15个文本）
常用问候语和短句，每个文本5-15个字符：
- བཀྲ་ཤིས་བདེ་ལེགས། (扎西德勒)
- ང་བོད་པ་ཡིན། (我是藏族人)
- ཐུགས་རྗེ་ཆེ། (谢谢)
- 等等...

### 中等（15个文本）
完整的句子，涉及日常对话和文化内容，每个文本20-50个字符：
- 关于藏族文化和历史的句子
- 日常生活和教育相关内容
- 自然和地理描述

### 困难（12个文本）
长句和段落，包含复杂的词汇和语法结构，每个文本50-100个字符：
- 藏族历史和宗教深度内容
- 文化遗产和传统
- 学术性描述

### 自定义
用户自己添加的练习文本，适合：
- 练习工作中常用的藏文内容
- 学习特定主题的词汇
- 准备藏文考试

## 🛠️ 技术栈

### 前端技术
- **HTML5**：语义化标签，完整的ARIA支持
- **CSS3**：CSS变量、Grid/Flexbox布局、渐变和动画
- **原生JavaScript (ES6+)**：Class语法、模块化设计、LocalStorage API
- **PWA**：Service Worker、Web App Manifest、离线缓存

### 字体和图标
- **Noto Serif Tibetan**：Google Fonts提供的专业藏文字体
- **Emoji**：使用原生Emoji图标，无需额外图标库

### 浏览器API
- LocalStorage：数据持久化
- Service Worker：离线支持和缓存
- Web Share API：分享功能
- Clipboard API：复制文本

### 代码特点
- **模块化**：使用Class组织代码，职责明确
- **无依赖**：零外部JavaScript库，加载快速
- **类型安全**：良好的错误处理和边界检查
- **性能优化**：事件委托、防抖处理、按需渲染

## 📁 项目结构

```
Himalaya/
├── index.html             # 主HTML文件（395行，含认证UI）
├── style.css              # 完整样式文件（1219行，含深色模式和认证UI）
├── app.js                 # JavaScript核心逻辑（900行）
├── firebase-config.js     # Firebase配置文件（可选）
├── auth.js                # 认证管理器（Firebase Auth集成）
├── auth-ui.js             # 认证UI控制器（登录/注册/个人中心）
├── manifest.json          # PWA配置文件
├── sw.js                  # Service Worker（438行）
├── icon-192.png           # PWA图标 192x192
├── icon-512.png           # PWA图标 512x512
├── robots.txt             # SEO爬虫控制
├── sitemap.xml            # 网站地图
├── SECURITY.md            # 安全策略
├── .well-known/
│   └── security.txt       # 安全联系信息
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # GitHub Actions自动部署
│   └── ISSUE_TEMPLATE/    # Issue模板
├── README.md              # 项目文档
├── CHANGELOG.md           # 版本更新日志
├── CONTRIBUTING.md        # 贡献指南
├── LICENSE                # MIT许可证
└── .gitignore             # Git忽略文件
```

## 🎨 主题定制

### 颜色变量

应用使用CSS变量实现主题切换，可在`style.css`中自定义：

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --bg-gradient-start: #667eea;
    --bg-gradient-end: #764ba2;
    /* 更多变量... */
}

[data-theme="dark"] {
    --primary-color: #8b9eff;
    --secondary-color: #9d6fd6;
    /* 深色模式变量... */
}
```

### 自定义藏文文本

编辑`app.js`中的`tibetanTexts`对象，添加更多练习文本：

```javascript
const tibetanTexts = {
    easy: ["text1", "text2", ...],
    medium: ["text1", "text2", ...],
    hard: ["text1", "text2", ...],
    custom: [] // 运行时动态添加
};
```

## 🔒 隐私和安全

- **纯本地运行**：所有数据保存在用户浏览器的LocalStorage中
- **无服务器通信**：不收集、不上传任何用户数据
- **无第三方跟踪**：不使用Google Analytics等跟踪工具
- **开源透明**：所有代码公开，可审计
- **安全第一**：无XSS、SQL注入等常见漏洞

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 备注 |
|--------|----------|------|
| Chrome | 90+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| iOS Safari | 14+ | ✅ 完全支持（可添加到主屏幕）|
| Chrome (Android) | 90+ | ✅ 完全支持（可安装PWA）|

**不支持的浏览器**：IE11及更早版本

## 📈 性能优化

- **首屏加载**：< 2秒（3G网络）
- **重复访问**：< 0.5秒（Service Worker缓存）
- **运行时性能**：60fps流畅动画
- **内存占用**：< 20MB
- **离线体积**：< 500KB（含缓存资源）

## 🐛 问题排查

### 藏文显示为方块

**原因**：浏览器未加载藏文字体

**解决**：
1. 确保网络连接正常（首次需要下载字体）
2. 清除浏览器缓存后重新加载
3. 检查浏览器控制台是否有字体加载错误

### 历史记录丢失

**原因**：浏览器清除了LocalStorage

**解决**：
1. 定期使用"导出数据"功能备份
2. 不要使用无痕/隐私模式
3. 检查浏览器设置中"退出时清除数据"选项

### Service Worker注册失败

**原因**：需要HTTPS或localhost环境

**解决**：
1. 在localhost上测试
2. 或部署到支持HTTPS的服务器
3. 或使用GitHub Pages等免费托管

### PWA无法安装

**原因**：不满足PWA安装条件

**解决**：
1. 确保使用HTTPS
2. 检查manifest.json和Service Worker是否正确加载
3. 在Chrome中检查DevTools → Application → Manifest

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 开发建议

- 遵循现有代码风格
- 添加适当的注释
- 测试所有浏览器
- 更新README文档
- 保持向后兼容

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有为藏文数字化做出贡献的开发者
- 感谢 [Google Fonts](https://fonts.google.com/) 提供的优质藏文字体
- 感谢所有使用和支持本项目的用户
- 特别感谢藏文化传承者和教育工作者

## 📞 联系方式

- **项目地址**：[GitHub Repository](https://github.com/confidence-kobe/Himalaya)
- **问题反馈**：[Issues](https://github.com/confidence-kobe/Himalaya/issues)
- **版本历史**：[Releases](https://github.com/confidence-kobe/Himalaya/releases)

## 🗺️ 路线图

### v1.1（计划中）
- [ ] 多用户支持（云同步）
- [ ] 更多统计图表（折线图、饼图）
- [ ] 练习模式（限时挑战、无限模式）
- [ ] 排行榜功能
- [ ] 社区分享的文本库

### v2.0（未来）
- [ ] 支持其他少数民族语言
- [ ] AI智能推荐练习内容
- [ ] 语音提示功能
- [ ] 跨设备同步
- [ ] 移动端原生应用

---

<div align="center">

**བཀྲ་ཤིས་བདེ་ལེགས། 祝您学习愉快！**

Made with ❤️ for Tibetan Language Learners

[⬆ 回到顶部](#-himalaya-藏文打字练习)

</div>
