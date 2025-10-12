import { Component } from '@angular/core';
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
  cardsList = [
    [1,  this.route + 'armadillo1' + this.extension],
    [2,  this.route + 'armadillo2' + this.extension],
    [3,  this.route + 'búfal1' + this.extension],
    [4,  this.route + 'búfal2' + this.extension],
    [5,  this.route + 'gat1' + this.extension],
    [6,  this.route + 'gat2' + this.extension],
    [7,  this.route + 'linx1' + this.extension],
    [8,  this.route + 'linx2' + this.extension],
    [9,  this.route + 'mofeta1' + this.extension],
    [10, this.route + 'mofeta2' + this.extension ],
    [11, this.route + 'ós_rentador1' + this.extension ],
    [12, this.route + 'ós_rentador2' + this.extension ],
    [13, this.route + 'ós1' + this.extension ],
    [14, this.route + 'ós2' + this.extension ],
    [15, this.route + 'ovella1' + this.extension ],
    [16, this.route + 'ovella2' + this.extension ],
    [17, this.route + 'tigre1' + this.extension ],
    [18, this.route + 'tigre2' + this.extension ],
    [19, this.route + 'tortuga1' + this.extension ],
    [20, this.route + 'tortuga2' + this.extension ],
  ];
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
    
}
