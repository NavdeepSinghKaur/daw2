class WhereDuoGame {
    audio = new Audio('assets/card-flip.mp3');
    containerName;
    positions = [];
    unmovableCards = [];
    attempts = 0;
    dimensions = [4];
    selectedCards = [];

    constructor (divName, numCards) {
        this.containerName = divName;
        this.numCards = numCards;
        this.initializeCards();

        this.getCards();
        setTimeout(() => {
            this.refreshCards();        
        }, 5000);
    }

    initializeCards() { 
        for (let i = 1; i <= this.numCards * 2; i++) {
            this.positions.push(Math.ceil(i / 2));
        }

        let helperArr = [];
        while (this.positions.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.positions.length);
            helperArr.push(this.positions[randomIndex]);
            this.positions.splice(randomIndex, 1);
        }

        this.positions = helperArr;
    }


    getCards() {
        switch (this.numCards) {
            case 8:  this.dimensions.push(4); break;
            case 10: this.dimensions.push(5); break;
            case 12: this.dimensions.push(6); break;
        }

        let div = document.getElementById(this.containerName);
        let attempts = document.createElement('p');
        let guessedCards = document.createElement('p');
        guessedCards.id = 'guessed';
        guessedCards.innerText = `Encerts: ${Math.floor(this.unmovableCards.length/2)}`;
        attempts.id = 'attempts';
        attempts.innerText = `Intents: ${this.attempts}`;

        let table = document.createElement('table');
        let imageCounter = 0;
        
        for (let i = 0; i < this.dimensions[0]; i++) {
            let td = document.createElement('td');
            for (let j = 0; j < this.dimensions[1]; j++) {
                let img = document.createElement('img');
                img.src = `assets/frontal${this.positions[imageCounter]}.png`;
                img.id = "animation";
                img.className = `${imageCounter}`;
                td.appendChild(img);
                imageCounter++;
            }
            let tr = document.createElement('tr');
            tr.appendChild(td);
            table.appendChild(tr);
        }
        
        let innerDiv = document.createElement('div');
        innerDiv.appendChild(guessedCards);
        innerDiv.appendChild(attempts);
        innerDiv.id = 'innerDiv';
        div.appendChild(innerDiv);
        div.appendChild(table);
    }

    refreshCards() {
        for (let index = 0; index < this.dimensions[0]*this.dimensions[1]; index++) {
            document.getElementsByTagName('img')[index].src = 'assets/trasera.png';
        }
        this.playGame();
    }

    playGame() {
        
        let gameArea = document.getElementById(this.containerName);

        gameArea.addEventListener('click', (e) => {
            
            let pos = e.target.className;
            if (!this.selectedCards.includes(pos) && this.selectedCards.length < 2 && pos) {
                e.target.src = `assets/frontal${this.positions[pos]}.png`;
                this.audio.play();
                this.selectedCards.push(pos);
            }
            if (this.selectedCards.length == 2) {

                if (this.positions[this.selectedCards[0]] == this.positions[this.selectedCards[1]]) {
                    this.unmovableCards.push(Number(this.selectedCards[0]), Number(this.selectedCards[1]));
                    this.selectedCards = [];
                } else {
                    gameArea.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (!this.unmovableCards.includes(Number(this.selectedCards[0]))) {
                            document.getElementsByClassName(this.selectedCards[0])[0].src = 'assets/trasera.png';
                            document.getElementsByClassName(this.selectedCards[1])[0].src = 'assets/trasera.png';
                        } else {
                            document.getElementsByClassName(this.selectedCards[0])[0].style.pointerEvents = 'none';
                            document.getElementsByClassName(this.selectedCards[1])[0].style.pointerEvents = 'none';
                        }
                        gameArea.style.pointerEvents = 'auto';
                        this.selectedCards = [];
                    }, 1000);
                }
                
                
                this.attempts++;
                document.getElementById('guessed').innerText = `Encerts: ${Math.floor(this.unmovableCards.length/2)}`;
                document.getElementById('attempts').innerText = `Intents: ${this.attempts}`;
            }

            
            if (this.unmovableCards.length == this.positions.length) {
                const div = document.getElementById(this.containerName);
                let congrats = document.createElement('p');
                congrats.innerText = "Felicitats, has trobat totes les parelles";
                div.appendChild(congrats);
                gameArea.style.pointerEvents = 'none';
            }
        });
    }
}