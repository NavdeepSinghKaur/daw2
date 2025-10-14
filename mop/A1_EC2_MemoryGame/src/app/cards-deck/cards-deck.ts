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
  hideCard?: boolean;
  showLeaderboard: boolean = false;
  selectedCards = new Array(21).fill(true);

  constructor () {
    let randomInt = Math.floor(Math.random()*20)+1;
    for (let index = 0; index < 20; index++) {
      while (this.randomList.indexOf(randomInt) !== -1) {
        randomInt = Math.floor(Math.random()*20)+1;  
      }
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

    this.randomList
    
    setTimeout(() => {
      this.selectedCards = new Array(21).fill(false);
    }, 4000);
  }
  
  index1?: number;
  index2?: number;
  cardClicked(index: number) {
    if (!this.index1) {
      this.index1 = index;
    } else {
      this.index2 = index;
    }
    this.selectedCards[index] = true;
    if (this.index1 && this.index2) {
      this.cardAlgorithm(this.index1, this.index2);
    }
  }

  cardAlgorithm(index1: number, index2: number) {
    let isRelative = 
      index1 % 2 == 0 
        ? (index2 == index1 - 1) 
        : (index2 == index1 + 1);

    if (isRelative) {
      finishedCards.push(index1, index2)
      this.hideCard = false;
    } else {
      this.hideCard = true;
      setTimeout(() => {
        this.selectedCards[index1] = false;
        this.selectedCards[index2] = false;
      }, 500);
    }
    this.index1 = this.index2 = undefined;

    if (finishedCards.length == 20) {
      localStorage.setItem('memoryGameFinished', 'true');
      let unformattedPlayers = localStorage.getItem('players')!;
      let players = JSON.parse(unformattedPlayers); 
      
      Object.values(players).forEach((player: any) => {
        if(player.name == this.name) {
          player["score"] = player["score"]+1;
          console.log(player);
        } else {
          console.log(player.name);
          console.log(player);
          console.log("player if didn't execute");
        }
      });
      this.showLeaderboard = true;
      localStorage.setItem('players', JSON.stringify(players));
      
    }
  }
  
}
