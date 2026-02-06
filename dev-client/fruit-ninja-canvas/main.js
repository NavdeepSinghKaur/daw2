// lives = 7;
points = 0;
fruitChosen = 0;
livesText = "*******";

//#region global variables
let newX = 0;
let newY = 0;
let rightClicked = false;
//#endregion

function fillBgImages(canvas, ctx) {
    ctx.drawImage(cloud, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(grass, 0, 250, canvas.width, 50);
    // ctx.beginPath();
}

function scoreArea(canvas, ctx) {
    ctx.save();
    ctx.rect(canvas.width -120, 0, 120, 70);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Arial';
    ctx.fillText("SCORE", canvas.width-112.5, 25);
    ctx.fillText(livesText, canvas.width-90, 50);
    ctx.fillText(points, canvas.width-25, 65);
    ctx.restore();
}

function getFruit() {
    const fruit = new Image();

    fruitChosen = Math.floor((Math.random() * 10) + 1);
    // console.log(fruitChosen);
    fruit.src = 'assets/fruit' + fruitChosen + '.png';
    fruit.id = "fruit";

    return fruit;
}

function paintFruit(canvas, ctx, fruit, newX, newY) {
    // lives--;
    let fruitX = 20;
    let fruitY = 20;
    ctx.drawImage(fruit, 0, 0, 128, 128, newX, newY, 0 + 60, 0 + 60); // 20 20 will get changed to random positions

}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    cloud = new Image();
    grass = new Image();
    // fruit = new Image();
    cloud.src = 'assets/cloud.jpg';
    grass.src = 'assets/grass.png';
    // ctx.beginPath();
    
    fillBgImages(canvas, ctx);
    scoreArea(canvas, ctx);

    let fruit = getFruit();

    fruit.addEventListener('load', () => {
        i = 0;
        clickAlgorithm(canvas);
        function animateFruit() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fillBgImages(canvas, ctx);
            scoreArea(canvas, ctx);
            if (rightClicked) {
                i = 300;
                rightClicked = false
            }
            paintFruit(canvas, ctx, fruit, newX, newY);

            newY++;
        
            if (i < 300) {
                requestAnimationFrame(animateFruit);
                i++;
            } else {
                console.log("i is 300");
                
                fruit = getFruit();
                paintFruit(canvas, ctx, fruit, newX, newY);
                // lives--;
                livesText = "******";
                i = 0;
                console.log(" i is ", i)
                requestAnimationFrame(animateFruit);
            }
        }

        animateFruit();
    });

});

function clickAlgorithm(canvas) {
    document.addEventListener('click', (e) => {
        e.clientX -= 10;
        e.clientY -= 10;
        conditionX = e.clientX >= newX && e.clientX <= (newX + 64);
        conditionY = e.clientY >= newY && e.clientY <= (newY + 64);

        if (conditionX && conditionY) {
            console.log("fruit picked");
            rightClicked = true;
        }
    });
}
