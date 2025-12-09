class WhereDuoGame {
    containerName;
    numCards; 
    positions = [];
    imagePositions = []; // stores the boolean map of the images
    flippedImage = [];
    actualTimestamp = null;
    height;
    width;

    constructor (divName, numCards) {
        this.containerName = divName;
        this.numCards = numCards;
        this.initializeCards();

        this.getCards();
        // this.flipCardsBack();
        requestAnimationFrame((timestamp) => this.getTotalFrames(timestamp));
    }

    // just calculates the posotions 
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

        console.log(this.positions);
        let div = document.getElementById(this.containerName);
        console.log(div);
        let table = document.createElement('table');
        let imageCounter = 0;
        
        for (let i = 0; i < this.height; i++) {
            let td = document.createElement('td');
            for (let j = 0; j < this.width; j++) {
                let img = document.createElement('img');

                img.src = `../assets/${this.positions[imageCounter]}`;
                
                td.appendChild(img);
                imageCounter++;
                console.log(td);
            }
            let tr = document.createElement('tr');
            tr.appendChild(td);
            table.appendChild(tr);
        }
        
        div.appendChild(table);
    }

    getTotalFrames(timestamp) {
        if (timestamp < 5000) {
            console.log(timestamp)
            /*
            (timestamp) => this.getTotalFrames(timestamp) <- js creates a reference on this funciton and calls it as 
            internalNameItGives(teimestamp)

            And so it's an arrow funct. becoz js' engine handles normal function's this. as the reference to the object's function's this.
            */
            requestAnimationFrame((timestamp) => this.getTotalFrames(timestamp));
            
        }
    }

    // flipCardsBack() {
    //     window.requestAnimationFrame(this.getTotalFrames);
    // }

/*
there will be one array with the cards, then another with the backside, the arrays will be coordinated by their coodinates

when a backside card gets pressed, it will show the card,
if the another card's name is the same, then the cards won't show back, because there will be another array that will control this behaviour.

the moment the boolean array gets true values in all it's positions, the game finishes
*/

}