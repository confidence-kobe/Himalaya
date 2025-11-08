// 藏文练习文本数据
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
        "བོད་ཡིག་སློབ་སྦྱོང་བྱེད་དགོས།"
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
        "ང་ཚོས་ཤེས་ཡོན་སློབ་སྦྱོང་ལ་ཤུགས་བསྐྱེད་དགོས།"
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
        "བོད་མི་རིགས་ཀྱི་ལོ་རྒྱུས་དང་སྔོན་རབས་རིག་གནས་ནི་དཔྱད་པའི་གནས་དོན་གལ་ཆེན་པོ་ཡིན་པ་དང་། དེ་དག་སྲུང་སྐྱོབ་བྱེད་དགོས།"
    ]
};

// 全局变量
let currentText = '';
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let errors = 0;
let totalCharsTyped = 0;
let isTypingStarted = false;

// DOM 元素
const targetTextElement = document.getElementById('targetText');
const userInputElement = document.getElementById('userInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficultySelect');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const progressElement = document.getElementById('progress');
const timerElement = document.getElementById('timer');
const resultModal = document.getElementById('resultModal');
const closeModalBtn = document.getElementById('closeModal');

// 初始化
function init() {
    loadNewText();
    addEventListeners();
}

// 加载新文本
function loadNewText() {
    const difficulty = difficultySelect.value;
    const texts = tibetanTexts[difficulty];
    currentText = texts[Math.floor(Math.random() * texts.length)];
    displayText();
    resetStats();
}

// 显示文本
function displayText() {
    targetTextElement.innerHTML = '';
    for (let i = 0; i < currentText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char');
        charSpan.textContent = currentText[i];
        if (i === 0) {
            charSpan.classList.add('current');
        }
        targetTextElement.appendChild(charSpan);
    }
}

// 添加事件监听器
function addEventListeners() {
    startBtn.addEventListener('click', startTyping);
    resetBtn.addEventListener('click', resetTyping);
    userInputElement.addEventListener('input', handleInput);
    closeModalBtn.addEventListener('click', closeModal);
    difficultySelect.addEventListener('change', loadNewText);
}

// 开始打字
function startTyping() {
    userInputElement.disabled = false;
    userInputElement.value = '';
    userInputElement.focus();
    startBtn.disabled = true;
    difficultySelect.disabled = true;
    isTypingStarted = false;
}

// 重置打字
function resetTyping() {
    clearInterval(timerInterval);
    userInputElement.value = '';
    userInputElement.disabled = true;
    startBtn.disabled = false;
    difficultySelect.disabled = false;
    loadNewText();
}

// 重置统计
function resetStats() {
    currentIndex = 0;
    startTime = null;
    errors = 0;
    totalCharsTyped = 0;
    isTypingStarted = false;
    clearInterval(timerInterval);
    updateStats();
}

// 处理输入
function handleInput(e) {
    if (!isTypingStarted) {
        isTypingStarted = true;
        startTime = Date.now();
        startTimer();
    }

    const inputValue = userInputElement.value;
    const inputLength = inputValue.length;

    // 更新字符状态
    const chars = targetTextElement.querySelectorAll('.char');

    // 清除所有状态
    chars.forEach(char => {
        char.classList.remove('correct', 'incorrect', 'current');
    });

    // 检查每个输入的字符
    for (let i = 0; i < inputLength; i++) {
        if (i < currentText.length) {
            if (inputValue[i] === currentText[i]) {
                chars[i].classList.add('correct');
            } else {
                chars[i].classList.add('incorrect');
            }
        }
    }

    // 设置当前字符
    if (inputLength < currentText.length) {
        chars[inputLength].classList.add('current');
    }

    // 更新统计
    totalCharsTyped = inputLength;
    updateStats();

    // 检查是否完成
    if (inputLength === currentText.length) {
        checkCompletion();
    }
}

// 检查完成
function checkCompletion() {
    const inputValue = userInputElement.value;

    // 计算错误数
    errors = 0;
    for (let i = 0; i < currentText.length; i++) {
        if (inputValue[i] !== currentText[i]) {
            errors++;
        }
    }

    // 如果完全正确，显示结果
    if (errors === 0) {
        finishTyping();
    }
}

// 完成打字
function finishTyping() {
    clearInterval(timerInterval);
    userInputElement.disabled = true;

    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = calculateWPM(currentText.length, timeElapsed);
    const accuracy = calculateAccuracy();

    // 显示结果模态框
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = accuracy;
    document.getElementById('finalTime').textContent = timeElapsed.toFixed(2);
    document.getElementById('totalChars').textContent = currentText.length;
    document.getElementById('errorCount').textContent = errors;

    resultModal.classList.remove('hidden');
}

// 关闭模态框
function closeModal() {
    resultModal.classList.add('hidden');
    resetTyping();
}

// 开始计时器
function startTimer() {
    timerInterval = setInterval(() => {
        if (startTime) {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            timerElement.textContent = elapsed + 's';
        }
    }, 100);
}

// 更新统计
function updateStats() {
    // 计算 WPM
    if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000;
        const wpm = calculateWPM(totalCharsTyped, timeElapsed);
        wpmElement.textContent = wpm;
    } else {
        wpmElement.textContent = '0';
    }

    // 计算准确率
    const accuracy = calculateAccuracy();
    accuracyElement.textContent = accuracy + '%';

    // 更新进度
    progressElement.textContent = `${totalCharsTyped}/${currentText.length}`;
}

// 计算 WPM (每分钟字符数)
function calculateWPM(chars, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    // 藏文按字符计算，每个字符作为一个单位
    const wpm = Math.round((chars / timeInSeconds) * 60);
    return wpm;
}

// 计算准确率
function calculateAccuracy() {
    if (totalCharsTyped === 0) return 100;

    const inputValue = userInputElement.value;
    let correctChars = 0;

    for (let i = 0; i < inputValue.length && i < currentText.length; i++) {
        if (inputValue[i] === currentText[i]) {
            correctChars++;
        }
    }

    const accuracy = Math.round((correctChars / totalCharsTyped) * 100);
    return accuracy;
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // ESC 重置
    if (e.key === 'Escape') {
        resetTyping();
    }

    // Ctrl/Cmd + Enter 开始
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!userInputElement.disabled) {
            return;
        }
        startTyping();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
