import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard {
  classifiedPlayers: any[] = [];

  constructor() {
    let unformattedPlayers = localStorage.getItem('players')!;

    let formattedPlayers = JSON.parse(unformattedPlayers);
    console.log(formattedPlayers);
    this.classifiedPlayers = formattedPlayers.sort((elem1: any, elem2: any) => {
      return elem2.score - elem1.score;
    });
  }  
}
