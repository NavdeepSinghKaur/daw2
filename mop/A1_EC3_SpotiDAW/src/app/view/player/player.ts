import { Component, input, Signal } from '@angular/core';
import { MusicList } from "../music-list/music-list";

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player {
  songImage = input();
  artistName = input();
  songTitle = input();
  isFavorite = input();
  description = input();
  songUrl = input<string>();
  pathOfSong = this.songUrl();

  constructor() {
  }
}


interface MusicType {
  title: string,
  artist: string,
  favorite: boolean,
  description: string,
  mp3Url: string,
  cover: string
}