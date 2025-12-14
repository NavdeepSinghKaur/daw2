class WhereDuoGame {
    audio = new Audio('assets/card-flip.mp3');
    containerName;
    numCards; 
    positions = [];
    // imagePositions = []; // stores the boolean map of the images
    // flippedImage = [];
    unmovableCards = [];
    actualTimestamp = null;
    // cardsPosition;
    // height;
    dimensions = [4]; // height, width
    // width;
    selectedCards = [];
    // reversedCards = 0;
    // booleanHelper = [];

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
        switch (this.numCards) {
            case 8:  this.dimensions.push(4); break;
            case 10: this.dimensions.push(5); break;
            case 12: this.dimensions.push(6); break;
        }
        // if (this.numCards == 8) {
        //     this.dimensions[0] = [4, 4];
        //     // this.height = 4;
        //     // this.width = 4;
        //     // this.cardsPosition = new Array(this.height*this.width).fill([false, false])
        // } else if (this.numCards == 10) {
        //     this.dimensions = [4, 5];
        //     // this.height = 4;
        //     // this.width = 5;
        //     // this.cardsPosition = new Array(this.height*this.width).fill([false, false])

        // } else if (this.numCards == 12) {
        //     this.dimensions = [4, 6];
        //     // this.height = 4;
        //     // this.width = 6;
        //     // this.cardsPosition = new Array(this.height*this.width).fill([false, false])

        // }

        

        console.log(this.positions);
        let div = document.getElementById(this.containerName);
        console.log(div);
        let table = document.createElement('table');
        let imageCounter = 0;
        
        for (let i = 0; i < this.dimensions[0]; i++) {
            let td = document.createElement('td');
            for (let j = 0; j < this.dimensions[1]; j++) {
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
        if (timestamp < 2000) {
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
        // let container = document.getElementById(this.containerName);
        for (let index = 0; index < this.dimensions[0]*this.dimensions[1]; index++) {
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
            // console.log(this.cardsPosition)
            console.log(e.target.className)
            // this.cardsPosition[e.target.className] = [true, false];
            // console.log(this.cardsPosition)
            // console.log(e.target.closest('td'));
            let pos = e.target.className;
            if (!this.selectedCards.includes(pos)) {
                // e.target.
                console.log(pos)
                // console.log()
                console.log(e.target.src = `/assets/frontal${this.positions[pos]}.png`);
                this.audio.play();
                this.selectedCards.push(pos);
            }
            // console.log(this.unmovableCards)
            // this.reversedCards++;

            // console.log(this.cardsPosition.filter(elem => elem[0] == true))
            // classNAme contains the positions, while positions contains the image number
            // if (this.reversedCards == 2) { // no need to explicitly tell == true
            // setTimeout(() => {
            if (this.selectedCards.length == 2) {
                console.log("two images are selected")
                // sadly there will be a loop
                // the loop will iterate all the images inside the div and then backside them
                // if they are in excluded positions, the loop will obiously not touch them
                // let elem1 = null;
                // let elem2 = null;
                // console.log(this.cardsPosition);
                // console.log(this.positions.length)
                // for (let i = 0; i < this.positions.length; i++) {
                //     if (this.cardsPosition[i][0] == true) {
                //         console.log("position", i, 'is true');
                //         if (elem1 == null) {
                //             elem1 = this.positions[i];
                //         } else {
                //             elem2 = this.positions[i];
                //         }
                //     }
                // }
                // console.log(this.selectedCards)
                // console.log(this.positions[this.selectedCards[0]]);
                // console.log(this.positions[this.selectedCards[1]]);
                // console.log(this.positions[this.selectedCards[0]] == this.positions[this.selectedCards[1]]);
                if (this.positions[this.selectedCards[0]] == this.positions[this.selectedCards[1]]) {
                    this.unmovableCards.push(Number(this.selectedCards[0]), Number(this.selectedCards[1]));
                }
                // problem here, or could be anywhere else, but cards don't flip back
                // console.log(this.positions.length);
                // console.log(this.unmovableCards);
                // console.log(this.positions);
                // console.log(this.unmovableCards.includes("23"));
                // console.log(this.unmovableCards.includes(23));
                for (let i = 0; i < this.positions.length; i++) {
                    console.log(this.unmovableCards.includes(i))
                    if (!this.unmovableCards.includes(i)) {
                        // console.log("the card in position ", i, "is invalid")
                        // console.log(document.getElementsByClassName(i)[0]);
                        setTimeout(() => {
                            document.getElementsByClassName(i)[0].src = '/assets/trasera.png';
                        }, 500);
                    }
                }
                // this.reversedCards = 0;
                this.selectedCards = [];
            }
            // }, 1000);

            if (this.unmovableCards.length == this.positions.length) { // onlyl solution is to add the position into the class name
                let div = document.appendChild('div');
                div.innerText = "Felicitats";
            }
            // e.src = 
        });
    }

    // flipCardsBack() {
    //     this.positions.find(elem => {
    //         elem
    //     })
    // }

/*
there will be one array with the cards, then another with the backside, the arrays will be coordinated by their coodinates

when a backside card gets pressed, it will show the card,
if the another card's name is the same, then the cards won't show back, because there will be another array that will control this behaviour.

the moment the boolean array gets true values in all it's positions, the game finishes
*/

}
