class WhereDuoGame {
    containerName;
    numCards; 
    positions = [];
    imagePositions = []; // stores the boolean map of the images
    flippedImage = [];
    unmovableCards = [];
    actualTimestamp = null;
    cardsPosition;
    height;
    dimensions = []; // height, width
    width;
    reversedCards = 0;
    booleanHelper = [];

    constructor (divName, numCards) {
        this.containerName = divName;
        this.numCards = numCards;
        this.initializeCards();

        this.getCards();
        // this.flipCardsBack();
        requestAnimationFrame((timestamp) => this.getTotalFrames(timestamp)); // <- recursive func.

    }

    // just calculates the posotions 
    initializeCards() {
        let calc = Math.floor(Math.random()*12)+1;
        this.positions.push(calc);
        while (this.positions.length < this.numCards*2) {
            let newCardCalculation = Math.floor(Math.random()*12)+1;
            // broken logic to fix
            while (this.positions.filter(element => element == newCardCalculation).length == 2) {
                newCardCalculation = Math.floor(Math.random()*12)+1;
            }
            console.log(this.positions[this.positions.length-1])
            this.positions.push(newCardCalculation);
        }
        console.log(this.positions);
    }

    getCards() {
        // refactor then to only width, because height remains the same always
        if (this.numCards == 8) {
            // this.dimensions[0] = [4, 4];
            this.height = 4;
            this.width = 4;
            this.cardsPosition = new Array(this.height*this.width).fill(false)
        } else if (this.numCards == 10) {
            // this.dimensions = [4, 5];
            this.height = 4;
            this.width = 5;
            this.cardsPosition = new Array(this.height*this.width).fill(false)

        } else if (this.numCards == 12) {
            // this.dimensions = [4, 6];
            this.height = 4;
            this.width = 6;
            this.cardsPosition = new Array(this.height*this.width).fill(false)

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
                console.log(this.positions[imageCounter]);
                img.src = `../assets/frontal${this.positions[imageCounter]}.png`;
                img.className = `${imageCounter}`;
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
        if (timestamp < 200) {
            console.log(timestamp)
            /*
            (timestamp) => this.getTotalFrames(timestamp) <- js creates a reference on this funciton and calls it as 
            internalNameItGives(teimestamp)

            And so it's an arrow funct. bc js' engine handles normal function's this. as the reference to the object's function's this.
            */
            requestAnimationFrame((timestamp) => this.getTotalFrames(timestamp));
            
        } else {
            // this.positions.forEach(position => {
            //     position[0] = '../assets/trasera.png';
            // });
            // console.log(this.positions);
            this.refreshCards();
        }
    }

    refreshCards() {
        let container = document.getElementById(this.containerName);
        for (let index = 0; index < this.height*this.width; index++) {
            document.getElementsByTagName('img')[index].src = '/assets/trasera.png';
        }
        console.log(document.getElementsByTagName('img')[0].src)
        // console.log(container.getElementsByTagName('table')[0].getElementsByClassName(''));

        this.playGame();
    }

    playGame() {
        // I think, positions array should have another inner array, or better, the html img property should have also the position of the image
        // then, to flip cards back would be an easier task
        let gameArea = document.getElementById(this.containerName);

        gameArea.addEventListener('click', (e) => {
            this.cardsPosition[e.target.className] = true;
            // console.log(e.target.closest('td'));
            let pos = e.target.className;
            // e.target.
            console.log(pos)
            // console.log()
            console.log(e.target.src = `/assets/frontal${this.positions[pos]}.png`);

            this.reversedCards++;

            if (this.cardsPosition.filter(elem => elem).length == 2) {
                console.log("two images are selected")
                // sadly there will be a loop
                // the loop will iterate all the images inside the div and then backside them
                // if they are in excluded positions, the loop will obiously not touch them
                let elem1 = null;
                let elem2 = null;
                console.log(this.cardsPosition);
                console.log(this.positions.length)
                for (let i = 0; i < this.positions.length; i++) {
                    if (this.cardsPosition[i] == true) {
                        console.log("position", i, 'is true');
                        if (elem1 == null) {
                            elem1 = this.positions[i];
                        } else {
                            elem2 = this.positions[i];
                        }
                    }
                }
                console.log(elem1);
                console.log(elem2);
                if (elem1 === elem2) {
                    this.unmovableCards.push(elem1, elem2);
                }

                // problem here, or could be anywhere else, but cards don't flip back
                for (let i = 0; i < this.positions.length; i++) {
                    if (!this.unmovableCards.includes(this.positions[i])) {
                        console.log(document.getElementsByClassName(this.positions[i])[0]);
                        document.getElementsByClassName(this.positions[i])[0].src = '/assets/trasera.png';
                    }
                }
            }

            // if (this.reversedCards == 2) { // onlyl solution is to add the position into the class name
            //     if ()
            // }
            // e.src = 
        })
    }

    flipCardsBack() {
        this.positions.find(elem => {
            elem
        })
    }

/*
there will be one array with the cards, then another with the backside, the arrays will be coordinated by their coodinates

when a backside card gets pressed, it will show the card,
if the another card's name is the same, then the cards won't show back, because there will be another array that will control this behaviour.

the moment the boolean array gets true values in all it's positions, the game finishes
*/

}
