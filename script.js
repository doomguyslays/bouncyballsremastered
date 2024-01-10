// Initialize Matter.js engine
const engine = Matter.Engine.create();
const world = engine.world;

let ball;
let bounceCount = 0;
let virtualCurrency = 0;

function setup() {
    // Ball setup
    ball = Matter.Bodies.circle(100, 100, 25, { restitution: 1 });
    Matter.World.add(world, ball);

    // Obstacle setup
    const obstacle = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, 200, 20, { isStatic: true });
    Matter.World.add(world, obstacle);

    // Collision events
    Matter.Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;

        pairs.forEach((collision) => {
            if (collision.bodyA === ball && collision.bodyB === obstacle) {
                bounceCount++;
                updateScore();

                // Example reward system - random currency increase
                virtualCurrency += Math.floor(Math.random() * 5) + 1;
                updateCurrency();
            }
        });
    });

    // Run the engine
    Matter.Engine.run(engine);

    // Render the game
    Matter.Render.run(Matter.Render.create({
        element: document.getElementById('game-container'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
        },
    }));
}

function updateScore() {
    document.getElementById('bounce-count').textContent = bounceCount;
}

function updateCurrency() {
    document.getElementById('virtual-currency').textContent = virtualCurrency;
}

function upgradeBall() {
    if (virtualCurrency >= 10) {
        virtualCurrency -= 10;
        Matter.Body.setRadius(ball, ball.circleRadius + 5);
        alert('Ball upgraded!');
        updateCurrency();
    } else {
        alert('Not enough virtual currency!');
    }
}

// Initial setup
setup();
