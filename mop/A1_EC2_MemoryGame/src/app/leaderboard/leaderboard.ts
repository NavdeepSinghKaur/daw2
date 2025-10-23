import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard {
  classifiedPlayers: any[];

  constructor() {
    let unformattedPlayers = localStorage.getItem('players')!;
    let formattedPlayers = JSON.parse(unformattedPlayers);
    
    this.classifiedPlayers = formattedPlayers.sort((player1: any, player2: any) => {
      return player2.score - player1.score;
    });
  }  
}
