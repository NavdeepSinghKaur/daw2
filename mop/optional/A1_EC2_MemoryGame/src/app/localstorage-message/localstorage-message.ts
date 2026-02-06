import { ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localstorage-message',
  imports: [FormsModule],
  templateUrl: './localstorage-message.html',
  styleUrl: './localstorage-message.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalstorageMessage {
  name: WritableSignal<string>;
  shuffle: WritableSignal<number>;

  playerName: OutputEmitterRef<string> = output();
  timesShuffle: OutputEmitterRef<number> = output();
  playerData: OutputEmitterRef<[string, number]> = output();

  constructor() {
    this.name = signal("");
    this.shuffle = signal(8);
  }

  saveValues(): void {
    let addPlayer = {
      "name": this.name(),
      "score": 0,
    }
    
    let unparsedLoadedPlayers = localStorage.getItem('players');

    let loadedPlayers: {name: string; score: number}[] = [];
    
    if (unparsedLoadedPlayers !== null) {
      loadedPlayers = JSON.parse(unparsedLoadedPlayers);

      let playerExists: boolean = false;
      Object.values(loadedPlayers).forEach((player: any) => {
        if (player.name === addPlayer.name) { playerExists = true; }
      });

      if (!playerExists) { loadedPlayers.push(addPlayer); }
    } else {
  
      loadedPlayers.push(addPlayer);
    }

    localStorage.setItem('players', JSON.stringify(loadedPlayers));
    
    this.playerData.emit([addPlayer.name, this.shuffle()]);
  }

  checkIfValuesAreValid(): boolean {
    return (this.name().trim().length > 0) ? false : true;
  }
}
