# Contributing to Tibetan Typing Practice

བཀྲ་ཤིས་བདེ་ལེགས། Thank you for your interest in contributing to the Tibetan Typing Practice project!

This document provides guidelines for contributing to this project. By participating in this project, you agree to abide by its terms.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

#### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 10, macOS 12.0, Ubuntu 22.04]
 - Browser: [e.g. Chrome 120, Firefox 119, Safari 17]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

#### Enhancement Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### Adding Practice Texts

We welcome contributions of authentic Tibetan texts! Please ensure:

1. **Authenticity**: Text should be grammatically correct Tibetan
2. **Appropriateness**: Content should be educational and culturally respectful
3. **Length**:
   - Easy: 5-15 characters
   - Medium: 20-50 characters
   - Hard: 50-100 characters
4. **Encoding**: Use proper Tibetan Unicode characters
5. **Translation**: Include English/Chinese translation in PR description

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/confidence-kobe/Himalaya.git
   cd Himalaya
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test thoroughly in multiple browsers

4. **Test your changes**
   ```bash
   # Open index.html in a local server
   python -m http.server 8000
   # or
   npx serve .
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots if UI changes

## 📝 Code Style Guidelines

### JavaScript

- Use **ES6+** features (classes, arrow functions, template literals)
- Use **const** for constants, **let** for variables
- Use **meaningful variable names** (avoid single letters except in loops)
- Add **JSDoc comments** for functions and classes
- Keep functions **small and focused** (single responsibility)
- Use **async/await** instead of callbacks when possible
- Handle **errors** with try-catch blocks

#### Good Example

```javascript
/**
 * Calculate typing speed in words per minute
 * @param {number} chars - Number of characters typed
 * @param {number} timeInSeconds - Time elapsed in seconds
 * @returns {number} WPM value
 */
static calculateWPM(chars, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    return Math.round((chars / timeInSeconds) * 60);
}
```

#### Bad Example

```javascript
// Don't do this
function calc(c, t) {
    return t ? Math.round((c / t) * 60) : 0;
}
```

### CSS

- Use **CSS variables** for theming
- Follow **BEM naming** where appropriate
- Group related styles together
- Add comments for complex selectors
- Use **mobile-first** responsive design
- Maintain **alphabetical order** for properties (optional but preferred)

#### Good Example

```css
/* Button Component */
.btn {
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    padding: 12px 30px;
    transition: var(--transition);
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
}
```

### HTML

- Use **semantic HTML5** tags
- Include **ARIA labels** for accessibility
- Keep **indentation consistent** (2 or 4 spaces)
- Add **comments** for major sections
- Use **lowercase** for attributes
- Quote all attribute values

#### Good Example

```html
<!-- Statistics Panel -->
<section class="stats-panel" aria-label="练习统计">
    <div class="stat-item" role="status" aria-live="polite">
        <span class="stat-label">WPM</span>
        <span class="stat-value" id="wpm">0</span>
    </div>
</section>
```

## 🧪 Testing Guidelines

Before submitting a PR, please test:

### Browser Testing

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Feature Testing

- ✅ Practice functionality works correctly
- ✅ Statistics calculate accurately
- ✅ History saves and loads properly
- ✅ Achievements unlock correctly
- ✅ Theme switching works
- ✅ Custom text feature works
- ✅ PWA installs successfully
- ✅ Offline mode functions
- ✅ Export/import data works

### Accessibility Testing

- ✅ Keyboard navigation works
- ✅ Screen reader compatibility
- ✅ High contrast mode
- ✅ Color blindness consideration
- ✅ Focus indicators visible

## 📋 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(practice): add speed tracking for individual characters

fix(history): resolve issue with data not persisting on Safari

docs(readme): update installation instructions

style(css): improve dark mode contrast ratios

refactor(managers): extract storage logic into separate class

perf(rendering): optimize chart rendering performance

test(achievements): add unit tests for achievement system

chore(deps): update service worker cache version
```

## 🌍 Internationalization (i18n)

If adding new UI text:

1. Use clear, concise language
2. Consider translation-friendly phrasing
3. Avoid idioms or culture-specific references
4. Add both Chinese and Tibetan where appropriate
5. Document any new text strings

## 🔒 Security Guidelines

- Never commit sensitive data (API keys, passwords, etc)
- Validate all user inputs
- Sanitize data before displaying
- Use HTTPS in production
- Follow OWASP security best practices
- Report security vulnerabilities privately

## 📚 Documentation

When adding features:

1. Update README.md if user-facing
2. Add JSDoc comments for code
3. Update CHANGELOG.md
4. Include inline comments for complex logic
5. Provide examples where helpful

## 🎯 Pull Request Process

1. **Update documentation** as needed
2. **Update CHANGELOG.md** with your changes
3. **Ensure all tests pass** in your environment
4. **Get review** from at least one maintainer
5. **Address feedback** promptly and professionally
6. **Squash commits** if requested
7. **Merge** will be done by maintainers

### PR Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Tested in multiple browsers
- [ ] Accessibility verified
- [ ] CHANGELOG.md updated

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 📞 Getting Help

- 💬 **Discussions**: For questions and ideas
- 🐛 **Issues**: For bugs and feature requests
- 📧 **Email**: For private concerns
- 📖 **Documentation**: Check README.md first

## 🎓 Learning Resources

New to the project? Check these resources:

- [README.md](README.md) - Project overview
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [PWA Guide](https://web.dev/progressive-web-apps/) - Progressive Web Apps
- [Accessibility Guide](https://www.w3.org/WAI/WCAG21/quickref/) - WCAG guidelines

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments section
- CHANGELOG.md for specific contributions
- Release notes for significant features

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Tibetan language learning! 🙏**

**བཀྲ་ཤིས་བདེ་ལེགས། Tashi Delek!**
