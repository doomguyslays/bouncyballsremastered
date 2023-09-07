const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');
const coinDisplay = document.getElementById('ball-coins');
const buyBallButton = document.getElementById('buy-ball-button');
const BALL_COST = 50;
const MAX_BALLS = 10; // Maximum number of balls on the screen
const BALLSPEED = 5;

let score = 0;
let highscore = 0;
let ballCoins = 0;
let ballCount = 0;

function updateCoinDisplay() {
    coinDisplay.textContent = ballCoins;
}

function earnBallCoins(amount) {
    ballCoins += amount;
    updateCoinDisplay();
}

function createNewBall() {
    if (ballCount >= MAX_BALLS) {
        return; // Don't create more balls than the maximum
    }

    const newBall = document.createElement('div');
    newBall.classList.add('ball');
    document.querySelector('.game-container').appendChild(newBall);

    const newX = Math.random() * (window.innerWidth - 50);
    const newY = Math.random() * (window.innerHeight - 50);
    const newDx = (Math.random() - 0.5) * BALLSPEED;
    const newDy = (Math.random() - 0.5) * BALLSPEED;

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

        count++;

        if (count < 1000) {
            requestAnimationFrame(updateBallPosition);
        } else {
            newBall.remove();
            ballCount--;
        }
    }

    ballCount++;
    updateBallPosition();
}

buyBallButton.addEventListener('click', () => {
    if (ballCoins >= BALL_COST && ballCount < MAX_BALLS) {
        ballCoins -= BALL_COST;
        updateCoinDisplay();
        createNewBall();
    } else if (ballCount >= MAX_BALLS) {
        alert('You have reached the maximum number of balls on the screen.');
    } else {
        alert('Not enough Ball Coins to buy a ball.');
    }
});

document.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score; // Fix for score text overlap
    earnBallCoins(1);

    if (score > highscore) {
        highscore = score;
        highscoreDisplay.textContent = 'High Score: ' + highscore; // Fix for score text overlap
    }
});

updateCoinDisplay();
