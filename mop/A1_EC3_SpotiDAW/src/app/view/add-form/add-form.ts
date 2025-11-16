import { ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicType } from '../music-list/music-list';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddForm {
  song: WritableSignal<MusicType> = signal<MusicType>({
    title: '',
    artist: '',
    description: '',
    cover: '',
    favorite: false,
    mp3Url: '',
  });

  exitScreen: OutputEmitterRef<boolean> = output<boolean>();

  
  songValues = output<MusicType>();
  
  constructor() {}

  protected addSong(): void {
    this.songValues.emit(this.song());
  }

  protected cleanInput() {
    this.song.set({
      title: '',
      artist: '',
      description: '',
      cover: '',
      favorite: false,
      mp3Url: '',
    });
  }
  
  cancel(): void {
    this.exitScreen.emit(true);
  }

}


