import { Component } from '@angular/core';
import { cardsList } from '../CardsList';
import { Card } from "./card/card";

@Component({
  selector: 'app-cards-deck',
  imports: [Card],
  templateUrl: './cards-deck.html',
  styleUrl: './cards-deck.css'
})
export class CardsDeck {
  route = 'assets/cardsDeck/';
  extension = '.png';

  randomList: number[] = [];
  constructor () {
    let randomInt = Math.floor(Math.random()*20);
    
    for (let index = 0; index < 20; index++) {
      while (this.randomList.indexOf(randomInt) !== -1) {
        randomInt = Math.floor(Math.random()*20);
      }
      
      this.randomList.push(randomInt);
    }
  }
  
  cardClicked(index: number) {
    console.log(index);
  }
  

}
