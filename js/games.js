// ==================== 通用游戏工具函数 ====================

// 显示反馈动画
function showFeedback(text, type) {
    const el = document.createElement('div');
    el.className = `feedback ${type}`;
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

// 显示Toast提示
function showToast(message, duration = 2000) {
    const el = document.createElement('div');
    el.style.cssText = `
        position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
        background: #1e293b; border: 2px solid #6366f1; border-radius: 12px;
        padding: 1rem 2rem; font-size: 1.2rem; z-index: 1000;
        color: #f1f5f9;
    `;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s';
        setTimeout(() => el.remove(), 500);
    }, duration);
}

// 打乱数组
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 倒计时
function startTimer(seconds, onTick, onEnd) {
    let remaining = seconds;
    const interval = setInterval(() => {
        remaining--;
        if (onTick) onTick(remaining);
        if (remaining <= 0) {
            clearInterval(interval);
            if (onEnd) onEnd();
        }
    }, 1000);
    return { stop: () => clearInterval(interval) };
}

// 创建游戏界面基础结构
function createGameBase(title, subtitle) {
    return `
    <div class="game-container">
        <a href="index.html" class="back-btn">← 返回目录</a>
        <div class="score-board">
            <div class="score-label">得分</div>
            <div class="score-value" id="score">0</div>
        </div>
        <div class="timer" id="timer" style="display:none;">60</div>
        <div class="game-header">
            <h1>${title}</h1>
            <div class="subtitle">${subtitle}</div>
        </div>
        <div id="startScreen" class="screen">
            <h2>🎮 ${title}</h2>
            <p id="gameDesc">${subtitle}</p>
            <button class="btn btn-primary" id="startBtn" style="font-size:1.5rem;padding:1rem 3rem;">开始游戏</button>
        </div>
        <div id="gameScreen" class="screen hidden" style="background:transparent;">
            <div class="game-area" id="gameArea"></div>
        </div>
        <div id="endScreen" class="screen hidden">
            <h2>🎉 游戏结束</h2>
            <p style="font-size:2rem;color:var(--accent);margin:1rem 0;">最终得分：<span id="finalScore">0</span></p>
            <p id="endMessage"></p>
            <button class="btn btn-primary" id="restartBtn" style="margin-top:1rem;">再玩一次</button>
            <a href="index.html" class="btn btn-secondary" style="margin-top:1rem;text-decoration:none;display:inline-block;">返回目录</a>
        </div>
    </div>`;
}

// 更新分数显示
function updateScore(score) {
    const el = document.getElementById('score');
    if (el) {
        el.textContent = score;
        el.style.transform = 'scale(1.3)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    }
}

// 显示/隐藏屏幕
function showScreen(name) {
    ['startScreen', 'gameScreen', 'endScreen'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', id !== name + 'Screen');
    });
}
