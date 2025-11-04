import { Component, signal } from '@angular/core';
import { MusicList } from "./view/music-list/music-list";

@Component({
  selector: 'app-root',
  imports: [ MusicList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('A1_EC3_SpotiDAW');
}
