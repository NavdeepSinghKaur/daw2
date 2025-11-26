class WhereDuoGame {
    containerName;
    numCards; 

    constructor (divName, numCards) {
        this.containerName = divName;
        this.numCards = numCards;
        this.initializeCards();
        this.startGame();
    }

    initializeCards() {
        let numCards = 12;
        let positions = [];
        
        while (positions.length < numCards*2) {
            let newCardCalculation = Math.floor(Math.random()*13);
            positions.push(newCardCalculation);
        }
        console.log(positions);
    }

    startGame() {

    }

}