import { ChangeDetectionStrategy, Component, input, output, OutputEmitterRef } from '@angular/core';
import { MusicType } from '../music-list/music-list';
@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Player {
  song = input.required<MusicType | null>();
  favoriteChange: OutputEmitterRef<MusicType | null> = output<MusicType | null>();
  
  constructor() {
  }

  changeFavoriteImage(): void {
    if (this.song() !== null) {
      this.favoriteChange.emit(this.song());
    }
  }
}