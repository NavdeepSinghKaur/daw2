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
  @Output() playerName: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  saveValues() {
    let addPlayer = {
        "name": this.name,
        "score": 0,
      }
    
    let oldPlayers = localStorage.getItem('players');
    if (oldPlayers !== null) {
      oldPlayers = JSON.parse(oldPlayers);
    }

    localStorage.setItem('players', JSON.stringify(addPlayer))
    this.playerName.emit(addPlayer["name"]);
  }
}
