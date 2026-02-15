//#region VARIABLES
impactAudio = new Audio('assets/ping.mp3');
clickFruit = new Audio('assets/bravo.mp3');

points = 0;
livesText = "*******";
speedRate = 0.500;
const cloud = new Image();
const grass = new Image();

let newX = 0;
let newY = 0;
let rightClicked = false;


//#region FUNCTIONS
function scoreArea(canvas, ctx) {
    ctx.save();
    ctx.rect(canvas.width -120, 0, 120, 70);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Arial';
    ctx.fillText("SCORE", canvas.width-112.5, 25);
    ctx.fillText(livesText, canvas.width-112.5, 50);
    ctx.fillText(points, canvas.width-112.5, 65);
    ctx.restore();
}

function getFruit() {
    const fruit = new Image();

    const fruitChosen = Math.floor((Math.random() * 10) + 1);
    fruit.src = 'assets/fruit' + fruitChosen + '.png';
    fruit.id = "fruit";

    return fruit;
}

function paintFruit(ctx, fruit, newX, newY) {
    ctx.drawImage(fruit, 0, 0, 128, 128, newX, newY, 0 + 60, 0 + 60);
}

function clickAlgorithm() {
    document.addEventListener('click', (e) => {
        e.clientX -= 10;
        e.clientY -= 10;
        conditionX = e.clientX >= newX && e.clientX <= (newX + 64);
        conditionY = e.clientY >= newY && e.clientY <= (newY + 64);

        if (conditionX && conditionY) {
            clickFruit.pause();
            clickFruit.currentTime = 0;
            clickFruit.play();
            rightClicked = true;
            speedRate+=0.2;
            points += 10;
        }
    });
}

function reduceLives() {
    impactAudio.play();
    let newLives = "";
    for (let i = 0; i < livesText.length -1; i++) {
        newLives += "*";
    }
    livesText = newLives;
}

//#region ENGINE
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startGame');

    cloud.src = 'assets/cloud.jpg';
    grass.src = 'assets/grass.png';
    ctx.drawImage(cloud, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(grass, 0, 250, canvas.width, 50);

    startBtn.addEventListener('click', () => {
        points = 0;
        livesText = "*******";
        speedRate = 0.500;
        newX = 0;
        rightClicked = false;

        startBtn.disabled = true;

        let fruit = getFruit();
        fruit.addEventListener('load', () => {
            clickAlgorithm();
            animateFruit();
        });

        function animateFruit() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(cloud, 0, 0, canvas.width, canvas.height);
            scoreArea(canvas, ctx);

            if (livesText.length == 0) {
                ctx.drawImage(grass, 0, 250, canvas.width, 50);
                ctx.save();
                ctx.fillStyle = '#000000';
                ctx.font = '65px Arial';
                ctx.fillText('GAME OVER', 150, 150);
                ctx.restore();
                ctx.fillText(`Score: ${points}`, 330, 220);
                startBtn.disabled = false;
                return;
            }

            paintFruit(ctx, fruit, newX, newY);
            ctx.drawImage(grass, 0, 250, canvas.width, 50);

            newY += speedRate;

            if (newY < 300 && !rightClicked) {
                requestAnimationFrame(animateFruit);
            } else {
                (!rightClicked) 
                    ? reduceLives() 
                    : rightClicked = false;
                newX = (Math.random() * 670);
                newY = 0;
                fruit = getFruit();
                paintFruit(ctx, fruit, newX, newY);
                requestAnimationFrame(animateFruit);
            }
        }
    });
});