import { ChangeDetectionStrategy, Component, signal, Signal, WritableSignal } from '@angular/core';
import { CardsDeck } from './cards-deck/cards-deck';
import { LocalstorageMessage } from "./localstorage-message/localstorage-message";

@Component({
  selector: 'app-root',
  imports: [CardsDeck, LocalstorageMessage],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  username!: Signal<string>;
  inputTimesToShuffle!: Signal<number>;
  showGame: WritableSignal<boolean>;

  constructor() {
    this.showGame = signal(false);
  }
  
  nameInserted(input: any): void {
    this.username = signal(input[0]);
    this.inputTimesToShuffle = signal(input[1])
    this.showGame.set(true);
  }
}
