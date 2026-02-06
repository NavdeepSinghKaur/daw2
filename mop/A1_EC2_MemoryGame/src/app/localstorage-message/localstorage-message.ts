import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localstorage-message',
  imports: [FormsModule],
  templateUrl: './localstorage-message.html',
  styleUrl: './localstorage-message.css'
})
export class LocalstorageMessage {
  name!: string;
  shuffle!: number;
  @Output() playerName: EventEmitter<string>;
  @Output() timesShuffle: EventEmitter<number>;

  constructor() {
    this.playerName = new EventEmitter<string>();
    this.timesShuffle = new EventEmitter<number>();
  }

  saveValues() {
    let addPlayer = {
      "name": this.name,
      "score": 0,
    }
    
    let unparsedLoadedPlayers = localStorage.getItem('players');

    let loadedPlayers;
    if (unparsedLoadedPlayers !== null) {
      loadedPlayers = JSON.parse(unparsedLoadedPlayers);

      let playerExists: boolean = false;
      Object.values(loadedPlayers).forEach((player: any) => {
        if (player.name === addPlayer.name) playerExists = true;
      });

      if (!playerExists) loadedPlayers.push(addPlayer);
    } else {
      loadedPlayers = [];
      loadedPlayers.push(addPlayer);
    }

    localStorage.setItem('players', JSON.stringify(loadedPlayers));
    
    this.playerName.emit(addPlayer["name"]);
    this.timesShuffle.emit(this.shuffle);
  }
}
