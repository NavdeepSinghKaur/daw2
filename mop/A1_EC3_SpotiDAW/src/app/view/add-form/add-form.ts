import { Component, output, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm {
  songTitle: WritableSignal<string> = signal<string>('');
  songImage: WritableSignal<string> = signal<string>('');
  artistName: WritableSignal<string> = signal<string>('');
  isFavorite: WritableSignal<boolean> = signal<boolean>(false);
  description: WritableSignal<string> = signal<string>('');
  songUrl: WritableSignal<string> = signal<string>('');

  songValues = output<[string, string, string, boolean, string, string]>();

  constructor() {}

  protected addSong() {
    this.songValues.emit([
      this.songTitle(),
      this.songImage(),
      this.artistName(),
      this.isFavorite(),
      this.description(),
      this.songUrl(),
    ]);
    console.log(this.songTitle());
    console.log(this.songImage());
    console.log(this.artistName());
    console.log(this.isFavorite());
    console.log(this.description());
    console.log(this.songUrl());
  }
}
