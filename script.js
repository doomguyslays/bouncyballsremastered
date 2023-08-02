let gameArea = document.getElementById('gameArea');
let scoreDisplay = document.getElementById('score');
let highScoreDisplay = document.getElementById('highScore');
let startButton = document.getElementById('startButton');
let addBallButton = document.getElementById('addBallButton');
let bulkBuyButton = document.getElementById('bulkBuyButton');

let paddleSpeed = 5;
let gameActive = false;

let singleBallCost = 5;
let bulkBuyCost = 20;

let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.innerText = 'High Score: ' + highScore;

let lastTime = localStorage.getItem('lastTime') ? new Date(localStorage.getItem('lastTime')) : new Date();
let currentTime = new Date();
let timeDiff = Math.abs(currentTime - lastTime);
let secondsDiff = Math.floor(timeDiff / 1000);
let idleBounces = secondsDiff;

let balls = [{
    el: document.querySelector('.ball'),
    speedX: 2,
    speedY: 3,
    posX: 0,
    posY: 0
}];

let score = idleBounces;
scoreDisplay.innerText = 'Score: ' + score;

window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        paddle.style.left = (paddle.getBoundingClientRect().left - paddleSpeed) + 'px';
    } else if (e.key === 'ArrowRight') {
        paddle.style.left = (paddle.getBoundingClientRect().left + paddleSpeed) + 'px';
    }
});

startButton.addEventListener('click', function() {
    gameActive = true;
    startButton.disabled = true;
    addBallButton.disabled = false;
    bulkBuyButton.disabled = false;
    update();
});

addBallButton.addEventListener('click', function() {
    if (score >= singleBallCost) {
        score -= singleBallCost;
        singleBallCost += 5;
        addBallButton.innerText = "Add Ball (Cost: " + singleBallCost + ")";
        scoreDisplay.innerText = 'Score: ' + score;
        addBall(1);
    }
});

bulkBuyButton.addEventListener('click', function() {
    if (score >= bulkBuyCost) {
        score -= bulkBuyCost;
        bulkBuyCost += 15;
        bulkBuyButton.innerText = "Bulk Buy Balls (Cost: " + bulkBuyCost + ")";
        scoreDisplay.innerText = 'Score: ' + score;
        addBall(5);
    }
});

function addBall(amount) {
    for (let i = 0; i < amount; i++) {
        let newBall = {
            el: document.createElement('div'),
            speedX: balls[0].speedX,
            speedY: balls[0].speedY,
            posX: 0,
            posY: 0
        };
        newBall.el.classList.add('ball');
        gameArea.appendChild(newBall.el);
        balls.push(newBall);
    }
}

function update() {
    if (!gameActive) return;

    let gameAreaRect = gameArea.getBoundingClientRect();

    balls.forEach(function(ball) {
        let ballRect = ball.el.getBoundingClientRect();

        if (ball.posX + ballRect.width > gameAreaRect.width || ball.posX < 0) {
            ball.speedX *= -1;
        }

        if (ball.posY < 0) {
            ball.speedY *= -1;
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
            if (score > highScore) {
                highScore = score;
                highScoreDisplay.innerText = 'High Score: ' + highScore;
                localStorage.setItem('highScore', highScore);
            }
        }

        if (ball.posY + ballRect.height > gameAreaRect.height) {
            ball.el.parentNode.removeChild(ball.el);
            balls = balls.filter(b => b !== ball);
        }

        ball.posX += ball.speedX;
        ball.posY += ball.speedY;

        ball.el.style.left = ball.posX + 'px';
        ball.el.style.top = ball.posY + 'px';
    });

    requestAnimationFrame(update);
}

update();

window.addEventListener('beforeunload', function() {
    localStorage.setItem('lastTime', new Date().toString());
});
