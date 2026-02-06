class WhereDuoGame {
    containerName;
    numCards; 
    positions = [];
    imagePositions = [];

    height;
    width;

    constructor (divName, numCards) {
        this.containerName = divName;
        this.numCards = numCards;
        this.initializeCards();

        this.getCards();
    }

    initializeCards() {
        while (this.positions.length < this.numCards*2) {
            let newCardCalculation = Math.floor(Math.random()*12)+1;
            while (this.positions.filter(element => element == `frontal${newCardCalculation}.png`).length == 2) {
                newCardCalculation = Math.floor(Math.random()*12)+1;
            }
            this.positions.push(`frontal${newCardCalculation}.png`);
        }
    }

    getCards() {
        if (this.numCards == 8) {
            this.height = 4;
            this.width = 4;
        } else if (this.numCards == 10) {
            this.height = 4;
            this.width = 5;
        } else if (this.numCards == 12) {
            this.height = 4;
            this.width = 6;
        }
        
        // initialize the canvas
        let canvas = document.createElement('canvas');
        console.log(this.positions);
        let div = document.getElementById(this.containerName);
        console.log(div);
        canvas.id = 'canvas';
        div.appendChild(canvas);
        canvas.height = '700';
        canvas.width = '920';

        // generate all the images and take a reference of the canvas
        let ctx = document.getElementById('canvas').getContext('2d');
        console.log(ctx);
        let imageCounter = 0;
        let totalImages = this.height*this.width;

        let yAxis = 0;
        imageCounter = 0;
        for (let i = 0; i < this.height; i++) {
            let xAxis = 0;
            for (let j = 0; j < this.width; j++) {
                const img = new Image(100, 100);
                let actualX = xAxis;
                let actualY = yAxis;
                img.addEventListener('load', () => {
                    ctx.drawImage(img, actualX, actualY);
                })

                img.src = `../assets/${this.positions[imageCounter]}`;
                xAxis += 120;
                imageCounter++;
                console.log(img);
                console.log(ctx);
                
            }
            yAxis += 150;
        }
        
    }

/*
there will be one array with the cards, then another with the backside, the arrays will be coordinated by their coodinates

when a backside card gets pressed, it will show the card,
if the another card's name is the same, then the cards won't show back, because there will be another array that will control this behaviour.

the moment the boolean array gets true values in all it's positions, the game finishes
*/

}