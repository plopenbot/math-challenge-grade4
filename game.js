// 游戏状态
let gameState = {
    currentQuestionIndex: 0,
    correctAnswers: 0,
    selectedQuestions: [],
    skills: {
        dad: 1,
        eliminate: 1,
        change: 1
    },
    answered: false,
    eliminatedOptions: []
};

// 初始化游戏
function initGame() {
    // 从题库中随机选取30道题
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    gameState.selectedQuestions = shuffled.slice(0, 30);
    
    // 显示第一题
    loadQuestion();
    updateProgress();
    updateSkillButtons();
}

// 加载当前题目
function loadQuestion() {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const questionNum = gameState.currentQuestionIndex + 1;
    
    // 重置状态
    gameState.answered = false;
    gameState.eliminatedOptions = [];
    
    // 更新技能按钮状态
    updateSkillButtons();
    
    // 更新题号
    document.getElementById('questionNumber').textContent = `第 ${questionNum} 题`;
    document.getElementById('questionText').textContent = question.question;
    
    // 生成选项（1个正确答案 + 3个干扰项，随机排序）
    const options = [
        { text: question.answer, isCorrect: true },
        ...question.distractors.map(d => ({ text: d, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);
    
    // 渲染选项
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
        btn.dataset.correct = option.isCorrect;
        btn.onclick = () => selectAnswer(btn);
        container.appendChild(btn);
    });
    
    // 隐藏下一题按钮
    document.getElementById('nextBtn').style.display = 'none';
}

// 选择答案
function selectAnswer(btn) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const isCorrect = btn.dataset.correct === 'true';
    
    // 禁用所有按钮和技能
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') {
            b.classList.add('correct');
        }
    });
    
    updateSkillButtons();
    
    // 标记选中的答案
    if (isCorrect) {
        btn.classList.add('correct');
        gameState.correctAnswers++;
        
        // 答对：显示正确弹窗
        setTimeout(() => {
            // 检查是否获得奖励
            const questionNum = gameState.currentQuestionIndex + 1;
            if (questionNum % 6 === 0 && questionNum < 30) {
                showReward();
            } else if (questionNum >= 30) {
                // 第30题答对，直接通关
                showCongrats();
            } else {
                showCorrectPopup();
            }
        }, 500);
    } else {
        btn.classList.add('wrong');
        
        // 答错：显示失败弹窗
        setTimeout(() => {
            showFailPopup();
        }, 800);
    }
    
    // 更新进度条
    updateProgress();
}

// 下一题
function nextQuestion() {
    gameState.currentQuestionIndex++;
    
    if (gameState.currentQuestionIndex >= 30) {
        showCongrats();
    } else {
        loadQuestion();
        updateProgress();
    }
}

// 显示正确弹窗
function showCorrectPopup() {
    document.getElementById('correctPopup').style.display = 'flex';
}

// 关闭正确弹窗
function closeCorrectPopup() {
    document.getElementById('correctPopup').style.display = 'none';
    nextQuestion();
}

// 显示失败弹窗
function showFailPopup() {
    document.getElementById('failedAt').textContent = gameState.currentQuestionIndex;
    document.getElementById('failPopup').style.display = 'flex';
}

// 使用技能
function useSkill(skillType) {
    if (gameState.skills[skillType] <= 0 || gameState.answered) return;
    
    gameState.skills[skillType]--;
    updateSkillButtons();
    
    const allButtons = document.querySelectorAll('.option-btn');
    
    switch(skillType) {
        case 'dad':
            // 求助爸爸：高亮正确答案
            allButtons.forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('highlighted');
                    setTimeout(() => {
                        if (!gameState.answered) {
                            btn.classList.remove('highlighted');
                        }
                    }, 3000);
                }
            });
            break;
            
        case 'eliminate':
            // 排除两个错误答案
            const wrongButtons = Array.from(allButtons).filter(btn => btn.dataset.correct === 'false');
            const toEliminate = wrongButtons.sort(() => Math.random() - 0.5).slice(0, 2);
            toEliminate.forEach(btn => {
                btn.classList.add('eliminated');
                btn.disabled = true;
            });
            break;
            
        case 'change':
            // 换题
            const unusedQuestions = questionBank.filter(q => 
                !gameState.selectedQuestions.some(sq => sq.question === q.question)
            );
            
            if (unusedQuestions.length > 0) {
                const newQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
                gameState.selectedQuestions[gameState.currentQuestionIndex] = newQuestion;
                loadQuestion();
            }
            break;
    }
}

// 显示奖励弹窗
function showReward() {
    const skills = ['dad', 'eliminate', 'change'];
    const skillNames = { dad: '求助爸爸', eliminate: '排除错误', change: '换题' };
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];
    
    gameState.skills[randomSkill]++;
    updateSkillButtons();
    
    document.getElementById('rewardText').textContent = 
        `🎉 恭喜获得技能卡片：${skillNames[randomSkill]}！`;
    document.getElementById('rewardPopup').style.display = 'flex';
}

// 关闭奖励弹窗
function closeReward() {
    document.getElementById('rewardPopup').style.display = 'none';
    nextQuestion();
}

// 更新进度条
function updateProgress() {
    const current = gameState.currentQuestionIndex + 1;
    const progress = (current / 30) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = `${current}/30`;
}

// 更新技能按钮
function updateSkillButtons() {
    // 更新技能数量显示
    document.getElementById('dadCount').textContent = gameState.skills.dad;
    document.getElementById('eliminateCount').textContent = gameState.skills.eliminate;
    document.getElementById('changeCount').textContent = gameState.skills.change;
    
    // 更新按钮可用状态
    const dadBtn = document.getElementById('skillDad');
    const eliminateBtn = document.getElementById('skillEliminate');
    const changeBtn = document.getElementById('skillChange');
    
    // 技能按钮在已答题或技能数为0时禁用
    dadBtn.disabled = gameState.skills.dad <= 0 || gameState.answered;
    eliminateBtn.disabled = gameState.skills.eliminate <= 0 || gameState.answered;
    changeBtn.disabled = gameState.skills.change <= 0 || gameState.answered;
}

// 显示通关界面
function showCongrats() {
    document.getElementById('questionArea').style.display = 'none';
    document.getElementById('congratsPanel').style.display = 'block';
    
    const accuracy = Math.round((gameState.correctAnswers / 30) * 100);
    document.getElementById('finalCorrect').textContent = gameState.correctAnswers;
    document.getElementById('finalAccuracy').textContent = accuracy;
}

// 重新开始
function restartGame() {
    // 关闭所有弹窗
    document.getElementById('failPopup').style.display = 'none';
    document.getElementById('rewardPopup').style.display = 'none';
    document.getElementById('correctPopup').style.display = 'none';
    
    gameState = {
        currentQuestionIndex: 0,
        correctAnswers: 0,
        selectedQuestions: [],
        skills: {
            dad: 1,
            eliminate: 1,
            change: 1
        },
        answered: false,
        eliminatedOptions: []
    };
    
    document.getElementById('questionArea').style.display = 'block';
    document.getElementById('congratsPanel').style.display = 'none';
    
    initGame();
}

// 页面加载完成后初始化
window.onload = initGame;
