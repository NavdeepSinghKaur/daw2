import { ChangeDetectionStrategy, Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Card } from "./card/card";
import { Leaderboard } from "../leaderboard/leaderboard";

@Component({
  selector: 'app-cards-deck',
  imports: [Card, Leaderboard],
  templateUrl: './cards-deck.html',
  styleUrl: './cards-deck.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsDeck {
  name: InputSignal<string> = input.required();
  timesToShuffle: InputSignal<number | undefined> = input();
  clickDisabled: boolean = true;

  randomList: WritableSignal<number[]>;
  showLeaderboard: WritableSignal<boolean>;
  selectedCards: WritableSignal<boolean[]>;
  cardsFinished: WritableSignal<number>;
  clickedCards: WritableSignal<number[]>;

  constructor () {
    this.clickedCards = signal([]);
    this.randomList = signal([]);
    this.cardsFinished = signal(0);
    this.showLeaderboard = signal(false);
    this.selectedCards = signal(new Array(21).fill(true));

    let randomInt: number;
    for (let index = 0; index < 20; index++) {
      do {
        randomInt = Math.floor(Math.random()*20)+1;
      } while (this.randomList().indexOf(randomInt) !== -1) 
        
      this.randomList.update((val: number[]) => [...val, randomInt]);
    }

    for (let index = 0; index < this.timesToShuffle()!; index++) {

      let firstValue = Math.floor(Math.random()*20);
      let secondValue = Math.floor(Math.random()*20);

      while (firstValue === secondValue) {
        secondValue = Math.floor(Math.random()*20)+1;
      }

      let storeArrValue = this.randomList()[firstValue];
      this.randomList.update(list => {
        const copy = [...list];
        copy[firstValue] = copy[secondValue];
        return copy;
      });
      this.randomList.update(list => {
        const copy = [...list];
        copy[secondValue] = storeArrValue;
        return copy;
      });
    }
    
    setTimeout(() => {
      this.selectedCards.set(new Array(21).fill(false));
      this.clickDisabled = false;
    }, 5000);
  }
  
  
  cardClicked(index: number): void {
    if (!this.clickDisabled && !this.clickedCards().includes(index)) {

      this.clickedCards.update(val => [...val, index]);
  
      this.selectedCards.update((cards: any) => {
        const newArr = [...cards];
        newArr[index] = true;
        return newArr;
      });

      if (this.clickedCards().length == 2) {
        this.cardAlgorithm(this.clickedCards()[0], this.clickedCards()[1]);
      }

    }
  }

  cardAlgorithm(index1: number, index2: number): void {
    let isRelative = index1 % 2 == 0 ? (index2 == index1 - 1) : (index2 == index1 + 1);

    if (isRelative) {
      this.cardsFinished.update(num => num+=2);
    } else {
      setTimeout(() => {
        this.selectedCards.update((values: any) => {
          const valuesArr = [...values];
          valuesArr[index1] = false;
          return valuesArr;
        })

        this.selectedCards.update((values: any) => {
          const valuesArr = [...values];
          valuesArr[index2] = false;
          return valuesArr;
        })
      }, 500);
    }
    this.clickedCards.set([]);

    if (this.cardsFinished() == 20) {
      let unformattedPlayers = localStorage.getItem('players')!;
      let players = JSON.parse(unformattedPlayers); 
      
      Object.values(players).forEach((player: any) => {
        if(player.name == this.name()) { player["score"] = player["score"]+1; }
      });

      this.showLeaderboard.set(true);
      localStorage.setItem('players', JSON.stringify(players));
    }
  }
}
