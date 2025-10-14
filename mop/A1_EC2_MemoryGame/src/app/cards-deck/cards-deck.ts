import { Component, Input } from '@angular/core';
import { finishedCards } from '../CardsList';
import { Card } from "./card/card";
import { Leaderboard } from "../leaderboard/leaderboard";

@Component({
  selector: 'app-cards-deck',
  imports: [Card, Leaderboard],
  templateUrl: './cards-deck.html',
  styleUrl: './cards-deck.css'
})
export class CardsDeck {
  @Input() name!: string;
  @Input() timesToShuffle!: number;
  randomList: number[] = [];
  
  showLeaderboard: boolean = false;
  selectedCards = new Array(21).fill(true);

  constructor () {
    let randomInt;
    for (let index = 0; index < 20; index++) {
      do {
        randomInt = Math.floor(Math.random()*20)+1;
      } while (this.randomList.indexOf(randomInt) !== -1) 
        
      this.randomList.push(randomInt);
    }

    for (let index = 0; index < this.timesToShuffle; index++) {
      let firstValue = Math.floor(Math.random()*20);
      let secondValue = Math.floor(Math.random()*20);

      while (firstValue === secondValue) {
        secondValue = Math.floor(Math.random()*20)+1;
      }

      let storeArrValue = this.randomList[firstValue];
      this.randomList[firstValue] = this.randomList[secondValue];
      this.randomList[secondValue] = storeArrValue;
    }
    
    setTimeout(() => {
      this.selectedCards = new Array(21).fill(false);
    }, 4000);
  }
  
  index1?: number;
  index2?: number;
  cardClicked(index: number) {
    !this.index1 ? this.index1 = index : this.index2 = index;
    
    this.selectedCards[index] = true;
    if (this.index1 && this.index2) {
      this.cardAlgorithm(this.index1, this.index2);
    }
  }

  cardAlgorithm(index1: number, index2: number) {
    let isRelative = index1 % 2 == 0 ? (index2 == index1 - 1) : (index2 == index1 + 1);

    if (isRelative) {
      finishedCards.push(index1, index2)
      
    } else {
      
      setTimeout(() => {
        this.selectedCards[index1] = false;
        this.selectedCards[index2] = false;
      }, 500);
    }
    this.index1 = undefined;
    this.index2 = undefined;

    if (finishedCards.length == 20) {
      localStorage.setItem('memoryGameFinished', 'true');
      let unformattedPlayers = localStorage.getItem('players')!;
      let players = JSON.parse(unformattedPlayers); 
      
      Object.values(players).forEach((player: any) => {
        if(player.name == this.name) {
          player["score"] = player["score"]+1;
        }

      });
      this.showLeaderboard = true;
      localStorage.setItem('players', JSON.stringify(players));

    }
  }
  
}
