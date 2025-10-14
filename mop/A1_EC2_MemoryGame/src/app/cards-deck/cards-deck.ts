import { Component, Input } from '@angular/core';
import { finishedCards } from '../CardsList';
import { Card } from "./card/card";

@Component({
  selector: 'app-cards-deck',
  imports: [Card],
  templateUrl: './cards-deck.html',
  styleUrl: './cards-deck.css'
})
export class CardsDeck {
  @Input() name!: string;
  randomList: number[] = [];
  hideCard?: boolean;
  selectedCards = new Array(21).fill(true);

  constructor () {
    let randomInt = Math.floor(Math.random()*20);
    for (let index = 0; index < 20; index++) { // replace by shuffle later
      while (this.randomList.indexOf(randomInt) !== -1) {
        randomInt = Math.floor(Math.random()*20)+1;
      }
      this.randomList.push(randomInt);
    }
    
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
      console.log(this.name);
      console.log(localStorage.getItem('players'));
    }
  }
  
}
