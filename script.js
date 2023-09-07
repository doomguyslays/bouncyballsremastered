const ball = document.querySelector('.ball');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');
const coinDisplay = document.getElementById('ball-coins');
const buyBallButton = document.getElementById('buy-ball-button');
const BALL_COST = 50;

let score = 0;
let highscore = 0;
let ballCoins = 0;

function updateCoinDisplay() {
    coinDisplay.textContent = ballCoins;
}

function earnBallCoins(amount) {
    ballCoins += amount;
    updateCoinDisplay();
}

buyBallButton.addEventListener('click', () => {
    if (ballCoins >= BALL_COST) {
        ballCoins -= BALL_COST;
        updateCoinDisplay();
        createNewBall();
    } else {
        alert('Not enough Ball Coins to buy a ball.');
    }
});

function createNewBall() {
    const newBall = document.createElement('div');
    newBall.classList.add('ball');
    document.querySelector('.game-container').appendChild(newBall);

    const newX = Math.random() * (window.innerWidth - 50);
    const newY = Math.random() * (window.innerHeight - 50);
    const newDx = (Math.random() - 0.5) * 10;
    const newDy = (Math.random() - 0.5) * 10;

    newBall.style.left = newX + 'px';
    newBall.style.top = newY + 'px';

    let count = 0;

    function updateBallPosition() {
        newX += newDx;
        newY += newDy;

        if (newX + newBall.clientWidth > window.innerWidth || newX < 0) {
            newDx = -newDx;
        }

        if (newY + newBall.clientHeight > window.innerHeight || newY < 0) {
            newDy = -newDy;
        }

        newBall.style.left = newX + 'px';
        newBall.style.top = newY + 'px';

        if (count < 1000) {
            count++;
            requestAnimationFrame(updateBallPosition);
        } else {
            newBall.remove();
        }
    }

    updateBallPosition();
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    earnBallCoins(1);

    if (score > highscore) {
        highscore = score;
        highscoreDisplay.textContent = highscore;
    }
}

function updateBallPosition() {
    // Existing ball movement code
}

function gameLoop() {
    updateBallPosition();
    requestAnimationFrame(gameLoop);
}

gameLoop();
