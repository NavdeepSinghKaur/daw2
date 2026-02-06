import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Leaderboard {
  classifiedPlayers: WritableSignal<any>;

  constructor() {
    let unformattedPlayers: WritableSignal<string> = signal(localStorage.getItem('players')!);
    let formattedPlayers: WritableSignal<[string, string]> = signal(JSON.parse(unformattedPlayers()));
    
    this.classifiedPlayers = signal(formattedPlayers().sort((player1: any, player2: any) => {
      return player2.score - player1.score;
    }));
  }  
}
