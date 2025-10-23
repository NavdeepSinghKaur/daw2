import { Component } from '@angular/core';
import { CardsDeck } from './cards-deck/cards-deck';
import { LocalstorageMessage } from "./localstorage-message/localstorage-message";

@Component({
  selector: 'app-root',
  imports: [CardsDeck, LocalstorageMessage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  username!: string;
  timesToShuffle!: number;
  showGame = false;
  
  nameInserted(input: string) {
    this.username = input;
    this.showGame = true;
  }
}
