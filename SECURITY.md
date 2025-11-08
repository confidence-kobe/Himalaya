# Security Policy

## 🔒 安全政策

我们非常重视 Himalaya 藏文打字练习项目的安全性。本文档概述了我们的安全策略以及如何负责任地报告安全漏洞。

## 📋 支持的版本

我们目前支持以下版本的安全更新：

| 版本 | 支持状态 |
| --- | --- |
| 1.0.x | :white_check_mark: 全力支持 |
| < 1.0 | :x: 不再支持 |

## 🛡️ 安全特性

本项目采用以下安全措施：

### 客户端安全
- ✅ **纯客户端应用** - 所有数据仅存储在用户浏览器本地
- ✅ **无服务器通信** - 不向任何服务器发送用户数据
- ✅ **LocalStorage 隔离** - 数据仅在同源策略下可访问
- ✅ **输入验证** - 所有用户输入都经过验证和清理
- ✅ **XSS 防护** - 使用 textContent 而非 innerHTML 防止脚本注入
- ✅ **CSP 就绪** - 代码结构支持内容安全策略

### PWA 安全
- ✅ **HTTPS 要求** - Service Worker 仅在 HTTPS 环境下运行
- ✅ **缓存隔离** - 每个版本使用独立的缓存命名空间
- ✅ **来源验证** - Service Worker 检查请求来源
- ✅ **安全标头** - 推荐配置适当的 HTTP 安全标头

### 代码安全
- ✅ **零依赖** - 无第三方库依赖，减少供应链风险
- ✅ **代码审计** - 所有代码公开可审计
- ✅ **版本控制** - 完整的 Git 历史记录
- ✅ **MIT 许可** - 开源透明

## 🚨 报告安全漏洞

如果您发现安全漏洞，请**不要**在公开的 Issue 中报告。请按以下方式负责任地披露：

### 报告渠道

#### 首选方式：私密报告
1. 访问项目的 [Security Advisories](https://github.com/confidence-kobe/Himalaya/security/advisories)
2. 点击 "Report a vulnerability"
3. 填写详细信息
4. 提交报告

#### 备选方式：电子邮件
如果 GitHub Security Advisories 不可用，请发送邮件至：
```
[项目维护者邮箱]
主题：[SECURITY] Himalaya 安全漏洞报告
```

### 报告内容

请在报告中包含以下信息：

1. **漏洞类型** - XSS、CSRF、数据泄露等
2. **影响范围** - 哪些版本受影响
3. **严重程度** - 您对严重程度的评估
4. **复现步骤** - 详细的复现方法
5. **影响说明** - 潜在的安全影响
6. **建议修复** - 如果您有修复建议（可选）
7. **POC 代码** - 概念验证代码（如适用）
8. **联系方式** - 您的联系方式，以便后续沟通

### 示例报告格式

```markdown
## 漏洞描述
[清晰描述发现的安全问题]

## 影响版本
- 受影响版本：v1.0.0
- 测试环境：Chrome 120 on macOS 12

## 严重程度
[严重 / 高 / 中 / 低]

## 复现步骤
1. [步骤1]
2. [步骤2]
3. [步骤3]

## 潜在影响
[描述攻击者可能造成的影响]

## 建议修复
[如果有修复建议，请提供]

## 附件
[相关截图、POC 代码等]
```

## ⏱️ 响应时效

我们承诺：

- **24小时内** - 确认收到安全报告
- **72小时内** - 提供初步评估和响应计划
- **7天内** - 对于严重漏洞，提供补丁或缓解措施
- **30天内** - 对于中低级漏洞，发布修复版本

## 🎯 漏洞评级标准

我们使用 CVSS 3.1 标准评估漏洞严重程度：

| 评分 | 严重程度 | 响应时间 |
|------|---------|---------|
| 9.0-10.0 | 严重 (Critical) | 24小时 |
| 7.0-8.9 | 高 (High) | 7天 |
| 4.0-6.9 | 中 (Medium) | 30天 |
| 0.1-3.9 | 低 (Low) | 90天 |

## 🏆 安全致谢

我们感谢以下安全研究人员的负责任披露：

<!-- 安全漏洞报告者将被列在此处 -->
- 暂无

如果您负责任地报告了安全漏洞，我们将：
1. 在修复后的版本说明中公开致谢（经您同意）
2. 将您添加到本页面的致谢名单
3. 在项目 README 中特别感谢

## 🔐 安全最佳实践

### 对于用户

1. **使用 HTTPS** - 始终通过 HTTPS 访问应用
2. **保持更新** - 使用最新版本的应用
3. **定期备份** - 导出您的练习数据备份
4. **隐私浏览** - 在公共设备上使用后清除缓存
5. **强制刷新** - 定期强制刷新以获取最新版本

### 对于开发者

1. **代码审查** - 所有 PR 需要代码审查
2. **依赖检查** - 虽然无外部依赖，但要监控浏览器 API 安全性
3. **安全测试** - 在发布前进行安全测试
4. **版本固定** - Service Worker 使用版本固定的缓存名称
5. **日志审查** - 监控控制台错误和异常行为

### 对于部署者

如果您自行部署此应用，建议：

```nginx
# Nginx 安全标头示例
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# CSP (内容安全策略)
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" always;
```

## 📚 安全资源

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [PWA Security](https://web.dev/security/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 🔍 已知限制

以下是本项目的已知安全限制（不是漏洞）：

1. **LocalStorage 限制**
   - 数据未加密存储在 LocalStorage
   - 可被浏览器扩展访问
   - 建议：敏感数据不应输入到练习文本中

2. **客户端验证**
   - 所有验证都在客户端进行
   - 用户可以修改本地数据
   - 影响：仅影响用户自己的数据，无安全风险

3. **无身份验证**
   - 应用无需登录
   - 无用户账户系统
   - 影响：数据仅限本地，无跨设备同步

## 📜 免责声明

本软件按"原样"提供，不提供任何明示或暗示的保证。使用本软件的风险由您自行承担。

详细的许可条款请参阅 [LICENSE](LICENSE) 文件。

## 📞 联系方式

- **安全问题**：通过 Security Advisories 或私密邮件报告
- **一般问题**：通过 [GitHub Issues](https://github.com/confidence-kobe/Himalaya/issues)
- **讨论**：通过 [GitHub Discussions](https://github.com/confidence-kobe/Himalaya/discussions)

---

**བཀྲ་ཤིས་བདེ་ལེགས། 感谢您帮助保护 Himalaya 项目的安全！**

*最后更新：2025-11-08*
*版本：1.0*
