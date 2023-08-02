const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to resize canvas
function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

// Call resizeCanvas function initially and on window resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let ballpoints = 0;
let ballCost = 10;

let balls = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2,
    color: 'red'
  }
];

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function updateBall(ball) {
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    ballpoints++;
  }

  if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    ballpoints++;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

function drawPoints() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Ballpoints: "+ballpoints, 8, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    drawBall(ball);
    updateBall(ball);
  });

  drawPoints();

  requestAnimationFrame(gameLoop);
}

function buyBall() {
  if (ballpoints >= ballCost) {
    ballpoints -= ballCost;
    ballCost *= 2;
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 10,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      color: 'red'
    });
  } else {
    alert('Not enough ballpoints!');
  }
}

canvas.addEventListener('touchmove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;  
  const scaleY = canvas.height / rect.height;
  balls[0].x = (event.touches[0].clientX - rect.left) * scaleX;
  balls[0].y = (event.touches[0].clientY - rect.top) * scaleY;
});

document.getElementById('buyBallButton').addEventListener('click', buyBall);

// Load the saved game state from localStorage when the page loads
window.onload = () => {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const { savedPoints, savedCost, savedBalls } = JSON.parse(savedState);
    ballpoints = savedPoints;
    ballCost = savedCost;
    balls = savedBalls;
  }
};

// Save the game state to localStorage every second
setInterval(() => {
  const gameState = {
    savedPoints: ballpoints,
    savedCost: ballCost,
    savedBalls: balls
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}, 1000);

gameLoop();
