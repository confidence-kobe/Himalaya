/**
 * Tibetan Typing Practice Application
 * Production-ready version with PWA support, dark mode, history tracking, achievements, and user authentication
 * Version: 1.1.0
 */

// ========================================
// Constants and Configuration
// ========================================
const CONFIG = {
    VERSION: '1.1.0',
    STORAGE_KEYS: {
        HISTORY: 'tibetan_typing_history',
        ACHIEVEMENTS: 'tibetan_typing_achievements',
        SETTINGS: 'tibetan_typing_settings',
        CUSTOM_TEXTS: 'tibetan_typing_custom_texts'
    },
    MAX_HISTORY_ITEMS: 100,
    CHART_MAX_ITEMS: 10
};

// Tibetan practice texts
const tibetanTexts = {
    easy: [
        "བཀྲ་ཤིས་བདེ་ལེགས།",
        "ཁྱེད་རང་ག་པར་ཕེབས་ཀྱི་ཡོད།",
        "ང་བོད་པ་ཡིན།",
        "ངའི་མིང་ལ་བསྟན་འཛིན་ཟེར།",
        "གནམ་གཤིས་ཡག་པོ་འདུག",
        "སྐུ་ཁམས་བཟང་པོ་ཡིན་པས།",
        "ཐུགས་རྗེ་ཆེ།",
        "བོད་ཀྱི་རི་རྒྱུད་མཐོ་པོ་རེད།",
        "ང་དེང་སང་ལགས་བཟང་པོ་ཡོད།",
        "བོད་ཡིག་སློབ་སྦྱོང་བྱེད་དགོས།",
        "ད་རིང་ཁྱེད་རང་བདེ་མོ་ཡིན་པས།",
        "ང་རང་ཁྱིམ་དུ་འགྲོ་དགོས།",
        "ཁྱེད་རང་ག་རེ་བྱེད་ཀྱི་ཡོད།",
        "བོད་ཀྱི་ཡུལ་རྒྱལ་པོའི་ཡུལ་རེད།",
        "ཁྱེད་རང་ལ་སྲས་མོ་ག་ཚོད་ཡོད།"
    ],
    medium: [
        "བོད་ནི་འཛམ་གླིང་གི་ས་མཐོ་ཤོས་ཡིན་པ་དང་། རི་རྒྱུད་ཀྱི་ས་ཆ་ཞིག་རེད།",
        "བོད་ཀྱི་རིག་གཞུང་ནི་རྒྱ་ཆེ་ཞིང་ཟབ་མོ་ཡིན་པ་མ་ཟད། ལོ་རྒྱུས་རིང་པོ་ཡོད།",
        "བོད་ཡིག་ནི་བོད་མི་རིགས་ཀྱི་ཡི་གེ་གཙོ་བོ་ཡིན་པ་དང་། ནང་པའི་གསུང་རབ་མང་པོ་བོད་ཡིག་ནང་ཡོད།",
        "ང་ཚོས་རང་རེའི་སྐད་ཡིག་དང་རིག་གཞུང་ལ་གཅེས་པར་འཛིན་དགོས།",
        "བོད་ཀྱི་ཆོས་དང་རིག་གནས་ནི་འགྲོ་བ་མིའི་རིན་ཐང་ཅན་གྱི་རྒྱུ་ནོར་ཞིག་ཡིན།",
        "སློབ་སྦྱོང་བྱེད་པ་ནི་འཚོ་བའི་ནང་གལ་ཆེན་པོ་རེད།",
        "བོད་ཀྱི་ལོ་རྒྱུས་ནི་སྟོང་ཕྲག་མང་པོའི་རིང་འཕེལ་རྒྱས་བྱུང་ཡོད།",
        "རང་གི་ཡུལ་དང་རང་གི་རིགས་ལ་བརྩི་མཐོང་བྱེད་དགོས།",
        "བོད་ཀྱི་གསོ་རིག་པའི་རིག་པ་ནི་གནའ་རབས་ནས་དར་ཁྱབ་ཆེན་པོ་བྱུང་ཡོད།",
        "ང་ཚོས་ཤེས་ཡོན་སློབ་སྦྱོང་ལ་ཤུགས་བསྐྱེད་དགོས།",
        "བོད་ཀྱི་ས་ཆ་ནི་སྣང་བ་ཡ་མཚན་ཅན་དང་རྣམ་པ་མང་པོ་ཡོད།",
        "བོད་མི་རིགས་ཀྱི་སྲོལ་རྒྱུན་རིག་གནས་ནི་ཧ་ཅང་གི་ཐུན་མིན་ཞིག་རེད།",
        "རང་གི་སྐད་ཡིག་སྲུང་སྐྱོབ་བྱེད་པ་ནི་ཆེས་གལ་ཆེན་རེད།",
        "བོད་ཀྱི་མཐོ་སྒང་གི་ས་ཁུལ་ལ་ནམ་མཁའི་མདོག་སྔོ་མོ་ཧ་ཅང་གསལ་པོ་ཡོད།",
        "བོད་ཀྱི་དུས་དེབ་རྙིང་པ་ནང་ལོ་རྒྱུས་དང་ཆོས་ལུགས་ཀྱི་གནད་དོན་མང་པོ་ཡོད།"
    ],
    hard: [
        "བོད་ཀྱི་སྔོན་རབས་ལོ་རྒྱུས་ནི་དཔྱད་པའི་གནས་དོན་གལ་ཆེན་པོ་ཞིག་ཡིན་པ་དང་། དེའི་ནང་དོན་ལ་རྒྱལ་རབས་དང་ཆོས་འབྱུང་སོགས་གནད་དོན་མང་པོ་ཡོད།",
        "ནང་བསྟན་བོད་དུ་དར་ཁྱབ་ཆེན་པོ་བྱུང་བ་དེ་ནི་བོད་ཀྱི་རིག་གཞུང་དང་སྤྱི་ཚོགས་ལ་གྱུར་བཅོས་ཆེན་པོ་ཞིག་ཐེབས་པ་རེད།",
        "བོད་ཀྱི་ས་གནས་མཐོ་ཞིང་གནམ་གཤིས་གྲང་བས་དེ་ནི་བོད་མི་རིགས་ཀྱི་འཚོ་བའི་ཐབས་ལམ་དང་མི་ཚེ་ལ་ཤུགས་རྐྱེན་ཆེན་པོ་སྤྲད་ཡོད།",
        "བོད་ཡིག་གི་བརྡ་སྤྲོད་རིག་པ་དང་སྙན་ངག་གི་རིག་པ་ནི་གནའ་རབས་ནས་འཕེལ་རྒྱས་གཏོང་ཞིང་མི་མང་གི་མཐོང་སྣང་ལ་ཤུགས་རྐྱེན་ཆེན་པོ་ཐེབས་ཡོད།",
        "བོད་ཀྱི་སྐད་རིགས་ནི་ཧི་མ་ལ་ཡའི་སྐད་བརྒྱུད་ཀྱི་ཁོངས་སུ་གཏོགས་ཤིང་། དེ་ནི་འཛམ་གླིང་གི་སྐད་རིགས་གལ་ཆེན་པོ་ཞིག་རེད།",
        "བོད་ཀྱི་ལུགས་སྲོལ་རིག་གཞུང་ནི་ལོ་ངོ་སྟོང་ཕྲག་མང་པོའི་འཕེལ་རྒྱས་ནང་གསར་རྙིང་སྣ་ཚོགས་བསྡུས་པ་ཞིག་ཡིན།",
        "ནང་པའི་གཞུང་ལུགས་དང་དབང་ཆ་བཅས་པ་ནི་བོད་ཀྱི་སྤྱི་ཚོགས་ཀྱི་གཞི་རྩ་ཞིག་ཡིན་པ་དང་། དེས་བོད་མིའི་སེམས་ཁམས་ལ་ཤུགས་རྐྱེན་ཆེན་པོ་སྤྲད་ཡོད།",
        "བོད་ཀྱི་ཤེས་རིག་གི་ལོ་རྒྱུས་ནང་ནང་པའི་དགོན་པ་དང་བཤད་གྲྭ་ནི་ཤེས་ཡོན་སྤེལ་གསོག་གི་གཙོ་གནད་ཡིན་པ་རེད།",
        "བོད་ཀྱི་རི་མོ་དང་གཟུགས་བརྙན་བཅས་པའི་རིག་གནས་ནི་ཧ་ཅང་གི་མཐོ་རིམ་ཡིན་ཞིང་། འཛམ་གླིང་གི་སྒྱུ་རྩལ་གྱི་ནང་དུ་རང་བཞིན་མཐོང་ཐུབ།",
        "བོད་མི་རིགས་ཀྱི་ལོ་རྒྱུས་དང་སྔོན་རབས་རིག་གནས་ནི་དཔྱད་པའི་གནས་དོན་གལ་ཆེན་པོ་ཡིན་པ་དང་། དེ་དག་སྲུང་སྐྱོབ་བྱེད་དགོས།",
        "བོད་ཀྱི་ནང་བསྟན་གྱི་ཆོས་བརྒྱུད་སྣ་ཚོགས་ནི་སྤྱི་ཚོགས་ཀྱི་འཕེལ་རྒྱས་དང་རིག་གཞུང་གི་ཁྱབ་སྤེལ་ལ་ཕན་ཐོགས་ཆེན་པོ་བྱུང་ཡོད།",
        "བོད་ཀྱི་སྐད་ཡིག་དང་ཡིག་གཟུགས་ནི་སངས་རྒྱས་པའི་བཀའ་དང་དགོངས་དོན་སྤེལ་བར་གལ་ཆེན་པོའི་འབྲེལ་བ་ཡོད།",
        "བོད་ཀྱི་རིག་གནས་ཀྱི་མི་སྣ་མང་པོ་ཞིག་གིས་འགྲོ་བ་མིའི་འཚོ་བ་དང་དགེ་སྡིག་གི་ལམ་སྟོན་བྱས་ཡོད།"
    ],
    custom: []
};

// Achievements definition
const ACHIEVEMENTS = [
    { id: 'first_practice', icon: '🎯', title: '初次尝试', desc: '完成第一次练习', check: (stats) => stats.totalPractices >= 1 },
    { id: 'fast_10', icon: '⚡', title: '速度达人', desc: '打字速度达到10 WPM', check: (stats) => stats.maxWpm >= 10 },
    { id: 'fast_20', icon: '🚀', title: '快手', desc: '打字速度达到20 WPM', check: (stats) => stats.maxWpm >= 20 },
    { id: 'fast_30', icon: '💫', title: '神速', desc: '打字速度达到30 WPM', check: (stats) => stats.maxWpm >= 30 },
    { id: 'accurate_90', icon: '🎖️', title: '准确高手', desc: '准确率达到90%', check: (stats) => stats.maxAccuracy >= 90 },
    { id: 'accurate_95', icon: '🏅', title: '精准大师', desc: '准确率达到95%', check: (stats) => stats.maxAccuracy >= 95 },
    { id: 'accurate_100', icon: '👑', title: '完美主义', desc: '达到100%准确率', check: (stats) => stats.maxAccuracy >= 100 },
    { id: 'practice_10', icon: '📚', title: '勤奋学习', desc: '完成10次练习', check: (stats) => stats.totalPractices >= 10 },
    { id: 'practice_50', icon: '🔥', title: '持之以恒', desc: '完成50次练习', check: (stats) => stats.totalPractices >= 50 },
    { id: 'practice_100', icon: '💎', title: '百炼成钢', desc: '完成100次练习', check: (stats) => stats.totalPractices >= 100 },
    { id: 'all_difficulties', icon: '🌟', title: '全能选手', desc: '在所有难度完成练习', check: (stats) => stats.difficultiesTried && stats.difficultiesTried.size >= 3 },
    { id: 'custom_text', icon: '✏️', title: '个性化', desc: '使用自定义文本练习', check: (stats) => stats.usedCustomText }
];

// ========================================
// Global Variables
// ========================================
let currentText = '';
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let errors = 0;
let totalCharsTyped = 0;
let isTypingStarted = false;
let deferredPrompt = null;
let currentDifficulty = 'medium';

// ========================================
// DOM Elements
// ========================================
const elements = {
    targetText: document.getElementById('targetText'),
    userInput: document.getElementById('userInput'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    customTextBtn: document.getElementById('customTextBtn'),
    difficultySelect: document.getElementById('difficultySelect'),
    wpm: document.getElementById('wpm'),
    accuracy: document.getElementById('accuracy'),
    progress: document.getElementById('progress'),
    timer: document.getElementById('timer'),
    resultModal: document.getElementById('resultModal'),
    closeModal: document.getElementById('closeModal'),
    shareResult: document.getElementById('shareResult'),
    themeToggle: document.getElementById('themeToggle'),
    historyBtn: document.getElementById('historyBtn'),
    achievementsBtn: document.getElementById('achievementsBtn'),
    historyModal: document.getElementById('historyModal'),
    achievementsModal: document.getElementById('achievementsModal'),
    customTextModal: document.getElementById('customTextModal'),
    loadingScreen: document.getElementById('loadingScreen'),
    installPrompt: document.getElementById('installPrompt'),
    installBtn: document.getElementById('installBtn'),
    dismissInstall: document.getElementById('dismissInstall')
};

// ========================================
// Storage Manager
// ========================================
class StorageManager {
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    }

    static load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Storage load error:', error);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
}

// ========================================
// History Manager
// ========================================
class HistoryManager {
    static addRecord(record) {
        let history = StorageManager.load(CONFIG.STORAGE_KEYS.HISTORY, []);

        const newRecord = {
            ...record,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            difficulty: currentDifficulty
        };

        history.unshift(newRecord);

        // Keep only last 100 records
        if (history.length > CONFIG.MAX_HISTORY_ITEMS) {
            history = history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
        }

        StorageManager.save(CONFIG.STORAGE_KEYS.HISTORY, history);
        return newRecord;
    }

    static getHistory() {
        return StorageManager.load(CONFIG.STORAGE_KEYS.HISTORY, []);
    }

    static clearHistory() {
        return StorageManager.remove(CONFIG.STORAGE_KEYS.HISTORY);
    }

    static getStatistics() {
        const history = this.getHistory();

        if (history.length === 0) {
            return {
                totalPractices: 0,
                avgWpm: 0,
                avgAccuracy: 0,
                maxWpm: 0,
                maxAccuracy: 0,
                totalTime: 0,
                difficultiesTried: new Set(),
                usedCustomText: false
            };
        }

        const totalPractices = history.length;
        const totalWpm = history.reduce((sum, record) => sum + record.wpm, 0);
        const totalAccuracy = history.reduce((sum, record) => sum + record.accuracy, 0);
        const maxWpm = Math.max(...history.map(record => record.wpm));
        const maxAccuracy = Math.max(...history.map(record => record.accuracy));
        const totalTime = history.reduce((sum, record) => sum + record.time, 0);
        const difficultiesTried = new Set(history.map(record => record.difficulty));
        const usedCustomText = history.some(record => record.difficulty === 'custom');

        return {
            totalPractices,
            avgWpm: Math.round(totalWpm / totalPractices),
            avgAccuracy: Math.round(totalAccuracy / totalPractices),
            maxWpm,
            maxAccuracy,
            totalTime: Math.round(totalTime),
            difficultiesTried,
            usedCustomText
        };
    }

    static exportData() {
        const history = this.getHistory();
        const stats = this.getStatistics();
        const data = { history, stats, exportDate: new Date().toISOString() };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tibetan-typing-history-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// ========================================
// Achievement Manager
// ========================================
class AchievementManager {
    static checkAchievements() {
        const stats = HistoryManager.getStatistics();
        const unlockedAchievements = StorageManager.load(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, []);
        const newAchievements = [];

        ACHIEVEMENTS.forEach(achievement => {
            if (!unlockedAchievements.includes(achievement.id) && achievement.check(stats)) {
                unlockedAchievements.push(achievement.id);
                newAchievements.push(achievement);
            }
        });

        if (newAchievements.length > 0) {
            StorageManager.save(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, unlockedAchievements);
        }

        return newAchievements;
    }

    static getUnlockedAchievements() {
        return StorageManager.load(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, []);
    }

    static showAchievementNotice(achievement) {
        const notice = document.getElementById('achievementNotice');
        const achievementText = document.getElementById('newAchievement');

        achievementText.textContent = `${achievement.icon} ${achievement.title}: ${achievement.desc}`;
        notice.classList.remove('hidden');
    }
}

// ========================================
// Theme Manager
// ========================================
class ThemeManager {
    static init() {
        const savedTheme = StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS, {}).theme || 'light';
        this.setTheme(savedTheme);
    }

    static setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = elements.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';

        const settings = StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS, {});
        settings.theme = theme;
        StorageManager.save(CONFIG.STORAGE_KEYS.SETTINGS, settings);
    }

    static toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ========================================
// PWA Manager
// ========================================
class PWAManager {
    static init() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                });
        }

        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;

            // Show install prompt after 30 seconds if not dismissed
            setTimeout(() => {
                if (deferredPrompt && !StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS, {}).installDismissed) {
                    elements.installPrompt.classList.remove('hidden');
                }
            }, 30000);
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed');
            deferredPrompt = null;
            elements.installPrompt.classList.add('hidden');
        });
    }

    static async install() {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Install prompt outcome: ${outcome}`);

        deferredPrompt = null;
        elements.installPrompt.classList.add('hidden');
    }

    static dismissInstall() {
        elements.installPrompt.classList.add('hidden');
        const settings = StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS, {});
        settings.installDismissed = true;
        StorageManager.save(CONFIG.STORAGE_KEYS.SETTINGS, settings);
    }
}

// ========================================
// Custom Text Manager
// ========================================
class CustomTextManager {
    static saveCustomText(text) {
        if (!text || text.trim().length === 0) {
            return false;
        }

        const customTexts = StorageManager.load(CONFIG.STORAGE_KEYS.CUSTOM_TEXTS, []);
        customTexts.push({
            id: Date.now(),
            text: text.trim(),
            createdAt: new Date().toISOString()
        });

        StorageManager.save(CONFIG.STORAGE_KEYS.CUSTOM_TEXTS, customTexts);
        tibetanTexts.custom.push(text.trim());
        return true;
    }

    static loadCustomTexts() {
        const customTexts = StorageManager.load(CONFIG.STORAGE_KEYS.CUSTOM_TEXTS, []);
        tibetanTexts.custom = customTexts.map(item => item.text);
    }
}

// ========================================
// Chart Renderer
// ========================================
class ChartRenderer {
    static renderHistoryChart(container) {
        const history = HistoryManager.getHistory();
        const recentHistory = history.slice(0, CONFIG.CHART_MAX_ITEMS).reverse();

        if (recentHistory.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">暂无练习记录</p>';
            return;
        }

        const maxWpm = Math.max(...recentHistory.map(r => r.wpm));
        const chartHtml = recentHistory.map((record, index) => {
            const height = (record.wpm / maxWpm) * 100;
            const color = record.accuracy >= 90 ? 'var(--success-color)' :
                          record.accuracy >= 70 ? 'var(--warning-color)' : 'var(--error-color)';

            return `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;">
                    <div style="width: 100%; height: ${height}%; background: ${color}; border-radius: 5px 5px 0 0; min-height: 10px; position: relative;">
                        <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; color: var(--text-primary);">${record.wpm}</span>
                    </div>
                    <span style="font-size: 0.7rem; color: var(--text-secondary);">#${recentHistory.length - index}</span>
                </div>
            `;
        }).join('');

        container.innerHTML = chartHtml;
    }

    static renderHistoryList(container) {
        const history = HistoryManager.getHistory();

        if (history.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">暂无练习记录</p>';
            return;
        }

        const listHtml = history.map((record, index) => {
            const date = new Date(record.timestamp);
            const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            const difficultyText = {
                easy: '简单',
                medium: '中等',
                hard: '困难',
                custom: '自定义'
            }[record.difficulty] || record.difficulty;

            return `
                <div class="history-item">
                    <div class="history-item-date">${dateStr} | ${difficultyText}</div>
                    <div class="history-item-stats">
                        <span>速度: ${record.wpm} WPM</span>
                        <span>准确率: ${record.accuracy}%</span>
                        <span>用时: ${record.time.toFixed(1)}s</span>
                        <span>字符: ${record.chars}</span>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = listHtml;
    }
}

// ========================================
// Modal Manager
// ========================================
class ModalManager {
    static show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            // Add click outside to close
            setTimeout(() => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.hide(modalId);
                    }
                });
            }, 100);
        }
    }

    static hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    static showHistory() {
        const stats = HistoryManager.getStatistics();

        document.getElementById('totalPractices').textContent = stats.totalPractices;
        document.getElementById('avgWpm').textContent = `${stats.avgWpm} WPM`;
        document.getElementById('avgAccuracy').textContent = `${stats.avgAccuracy}%`;
        document.getElementById('maxWpm').textContent = `${stats.maxWpm} WPM`;

        ChartRenderer.renderHistoryChart(document.getElementById('historyChart'));
        ChartRenderer.renderHistoryList(document.getElementById('historyList'));

        this.show('historyModal');
    }

    static showAchievements() {
        const unlockedIds = AchievementManager.getUnlockedAchievements();

        const achievementsHtml = ACHIEVEMENTS.map(achievement => {
            const unlocked = unlockedIds.includes(achievement.id);
            const className = unlocked ? 'achievement-card unlocked' : 'achievement-card locked';

            return `
                <div class="${className}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                </div>
            `;
        }).join('');

        document.getElementById('achievementsList').innerHTML = achievementsHtml;
        this.show('achievementsModal');
    }

    static showCustomText() {
        this.show('customTextModal');
        document.getElementById('customTextInput').value = '';
        document.getElementById('customTextInput').focus();
    }
}

// ========================================
// Practice Manager
// ========================================
class PracticeManager {
    static loadNewText() {
        currentDifficulty = elements.difficultySelect.value;
        const texts = tibetanTexts[currentDifficulty];

        if (!texts || texts.length === 0) {
            if (currentDifficulty === 'custom') {
                Toast.warning('请先添加自定义文本！', '无自定义文本');
                elements.difficultySelect.value = 'medium';
                currentDifficulty = 'medium';
                this.loadNewText();
                return;
            }
        }

        currentText = texts[Math.floor(Math.random() * texts.length)];
        this.displayText();
        this.resetStats();
    }

    static displayText() {
        elements.targetText.innerHTML = '';
        for (let i = 0; i < currentText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.textContent = currentText[i];
            if (i === 0) {
                charSpan.classList.add('current');
            }
            elements.targetText.appendChild(charSpan);
        }
    }

    static resetStats() {
        currentIndex = 0;
        startTime = null;
        errors = 0;
        totalCharsTyped = 0;
        isTypingStarted = false;
        clearInterval(timerInterval);
        this.updateStats();

        // Hide achievement notice
        document.getElementById('achievementNotice').classList.add('hidden');
    }

    static startTyping() {
        elements.userInput.disabled = false;
        elements.userInput.value = '';
        elements.userInput.focus();
        elements.startBtn.disabled = true;
        elements.difficultySelect.disabled = true;
        isTypingStarted = false;
    }

    static resetTyping() {
        clearInterval(timerInterval);
        elements.userInput.value = '';
        elements.userInput.disabled = true;
        elements.startBtn.disabled = false;
        elements.difficultySelect.disabled = false;
        this.loadNewText();
    }

    static handleInput() {
        if (!isTypingStarted) {
            isTypingStarted = true;
            startTime = Date.now();
            this.startTimer();
        }

        const inputValue = elements.userInput.value;
        const inputLength = inputValue.length;

        // Update character states
        const chars = elements.targetText.querySelectorAll('.char');

        // Clear all states
        chars.forEach(char => {
            char.classList.remove('correct', 'incorrect', 'current');
        });

        // Check each input character
        for (let i = 0; i < inputLength; i++) {
            if (i < currentText.length) {
                if (inputValue[i] === currentText[i]) {
                    chars[i].classList.add('correct');
                } else {
                    chars[i].classList.add('incorrect');
                }
            }
        }

        // Set current character
        if (inputLength < currentText.length) {
            chars[inputLength].classList.add('current');
        }

        // Update statistics
        totalCharsTyped = inputLength;
        this.updateStats();

        // Check completion
        if (inputLength === currentText.length) {
            this.checkCompletion();
        }
    }

    static checkCompletion() {
        const inputValue = elements.userInput.value;

        // Calculate errors
        errors = 0;
        for (let i = 0; i < currentText.length; i++) {
            if (inputValue[i] !== currentText[i]) {
                errors++;
            }
        }

        // If perfect, finish
        if (errors === 0) {
            this.finishTyping();
        }
    }

    static finishTyping() {
        clearInterval(timerInterval);
        elements.userInput.disabled = true;

        const timeElapsed = (Date.now() - startTime) / 1000;
        const wpm = this.calculateWPM(currentText.length, timeElapsed);
        const accuracy = this.calculateAccuracy();

        // Save to history
        const record = {
            wpm,
            accuracy,
            time: timeElapsed,
            chars: currentText.length,
            errors
        };

        HistoryManager.addRecord(record);

        // Check achievements
        const newAchievements = AchievementManager.checkAchievements();
        if (newAchievements.length > 0) {
            AchievementManager.showAchievementNotice(newAchievements[0]);
        }

        // Show result modal
        document.getElementById('finalWpm').textContent = wpm;
        document.getElementById('finalAccuracy').textContent = accuracy;
        document.getElementById('finalTime').textContent = timeElapsed.toFixed(2);
        document.getElementById('totalChars').textContent = currentText.length;
        document.getElementById('errorCount').textContent = errors;

        ModalManager.show('resultModal');
    }

    static startTimer() {
        timerInterval = setInterval(() => {
            if (startTime) {
                const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                elements.timer.textContent = elapsed + 's';
            }
        }, 100);
    }

    static updateStats() {
        // Calculate WPM
        if (startTime) {
            const timeElapsed = (Date.now() - startTime) / 1000;
            const wpm = this.calculateWPM(totalCharsTyped, timeElapsed);
            elements.wpm.textContent = wpm;
        } else {
            elements.wpm.textContent = '0';
        }

        // Calculate accuracy
        const accuracy = this.calculateAccuracy();
        elements.accuracy.textContent = accuracy + '%';

        // Update progress
        elements.progress.textContent = `${totalCharsTyped}/${currentText.length}`;
    }

    static calculateWPM(chars, timeInSeconds) {
        if (timeInSeconds === 0) return 0;
        const wpm = Math.round((chars / timeInSeconds) * 60);
        return wpm;
    }

    static calculateAccuracy() {
        if (totalCharsTyped === 0) return 100;

        const inputValue = elements.userInput.value;
        let correctChars = 0;

        for (let i = 0; i < inputValue.length && i < currentText.length; i++) {
            if (inputValue[i] === currentText[i]) {
                correctChars++;
            }
        }

        const accuracy = Math.round((correctChars / totalCharsTyped) * 100);
        return accuracy;
    }

    static shareResult() {
        const wpm = document.getElementById('finalWpm').textContent;
        const accuracy = document.getElementById('finalAccuracy').textContent;
        const text = `我在藏文打字练习中获得了 ${wpm} WPM 的速度和 ${accuracy}% 的准确率！🎉\n\n#藏文打字练习 #བོད་ཡིག`;

        if (navigator.share) {
            navigator.share({
                title: '藏文打字练习成绩',
                text: text
            }).catch((error) => console.log('Share failed:', error));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                Toast.success('成绩已复制到剪贴板！');
            }).catch((error) => {
                console.error('Copy failed:', error);
                Toast.warning('无法复制，请手动截图分享');
            });
        }
    }
}

// ========================================
// Event Handlers
// ========================================
function setupEventListeners() {
    // Practice controls
    elements.startBtn.addEventListener('click', () => PracticeManager.startTyping());
    elements.resetBtn.addEventListener('click', () => PracticeManager.resetTyping());
    elements.userInput.addEventListener('input', () => PracticeManager.handleInput());
    elements.difficultySelect.addEventListener('change', () => PracticeManager.loadNewText());

    // Modals
    elements.closeModal.addEventListener('click', () => {
        ModalManager.hide('resultModal');
        PracticeManager.resetTyping();
    });

    elements.shareResult.addEventListener('click', () => PracticeManager.shareResult());

    // Theme toggle
    elements.themeToggle.addEventListener('click', () => ThemeManager.toggle());

    // History
    elements.historyBtn.addEventListener('click', () => ModalManager.showHistory());
    document.getElementById('closeHistory').addEventListener('click', () => ModalManager.hide('historyModal'));
    document.getElementById('clearHistory').addEventListener('click', () => {
        if (confirm('确定要清除所有历史记录吗？此操作无法撤销。')) {
            HistoryManager.clearHistory();
            ModalManager.hide('historyModal');
            Toast.success('历史记录已清除');
        }
    });
    document.getElementById('exportHistory').addEventListener('click', () => HistoryManager.exportData());

    // Achievements
    elements.achievementsBtn.addEventListener('click', () => ModalManager.showAchievements());
    document.getElementById('closeAchievements').addEventListener('click', () => ModalManager.hide('achievementsModal'));

    // Custom text
    elements.customTextBtn.addEventListener('click', () => ModalManager.showCustomText());
    document.getElementById('saveCustomText').addEventListener('click', () => {
        const text = document.getElementById('customTextInput').value;
        if (CustomTextManager.saveCustomText(text)) {
            ModalManager.hide('customTextModal');
            elements.difficultySelect.value = 'custom';
            PracticeManager.loadNewText();
            Toast.success('自定义文本已保存！');
        } else {
            Toast.error('请输入有效的文本');
        }
    });
    document.getElementById('cancelCustomText').addEventListener('click', () => ModalManager.hide('customTextModal'));

    // PWA install
    if (elements.installBtn) {
        elements.installBtn.addEventListener('click', () => PWAManager.install());
    }
    if (elements.dismissInstall) {
        elements.dismissInstall.addEventListener('click', () => PWAManager.dismissInstall());
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to reset
        if (e.key === 'Escape') {
            // Close any open modal first
            document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                modal.classList.add('hidden');
            });

            if (!elements.userInput.disabled) {
                PracticeManager.resetTyping();
            }
        }

        // Ctrl/Cmd + Enter to start
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (elements.userInput.disabled && !elements.startBtn.disabled) {
                PracticeManager.startTyping();
            }
        }
    });
}

// ========================================
// Initialization
// ========================================
async function init() {
    console.log('Initializing Tibetan Typing Practice v' + CONFIG.VERSION);

    // Initialize managers
    ThemeManager.init();
    PWAManager.init();
    CustomTextManager.loadCustomTexts();

    // Setup UI
    PracticeManager.loadNewText();
    setupEventListeners();

    // Hide loading screen
    setTimeout(() => {
        elements.loadingScreen.classList.add('loaded');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);

    console.log('Initialization complete');
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// ========================================
// Toast Notification System
// ========================================
const Toast = (() => {
    const ICONS = { success: '✅', error: '❌', warning: '⚠️', info: '💡' };
    const DURATION = { success: 2500, error: 4000, warning: 3000, info: 2500 };

    function getContainer() {
        let c = document.getElementById('toastContainer');
        if (!c) {
            c = document.createElement('div');
            c.id = 'toastContainer';
            c.className = 'toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    function show(message, type = 'info', title = '') {
        const container = getContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${ICONS[type]}</span>
            <div class="toast-body">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="关闭">×</button>`;

        container.appendChild(toast);

        const dismiss = () => {
            toast.classList.add('toast-out');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', dismiss);
        setTimeout(dismiss, DURATION[type]);
    }

    return {
        success: (msg, title = '') => show(msg, 'success', title),
        error:   (msg, title = '') => show(msg, 'error',   title),
        warning: (msg, title = '') => show(msg, 'warning', title),
        info:    (msg, title = '') => show(msg, 'info',    title),
    };
})();
