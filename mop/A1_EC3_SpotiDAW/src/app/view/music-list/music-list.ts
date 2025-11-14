import { Component, output, Signal, signal, WritableSignal } from '@angular/core';
import { Player } from "../player/player";
import { AddForm } from "../add-form/add-form";
import { SONGS } from '../../model/songs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-list',
  imports: [Player, AddForm, FormsModule],
  templateUrl: './music-list.html',
  styleUrl: './music-list.scss',
})
export class MusicList {
  songTitle: WritableSignal<string> = signal<string>("");
  songImage: WritableSignal<string> = signal<string>("");
  artistName: WritableSignal<string> = signal<string>("");
  isFavorite: WritableSignal<boolean> = signal<boolean>(false);
  description: WritableSignal<string> = signal<string>("");
  songUrl: WritableSignal<string> = signal<string>("");
  protected _openForm: boolean = false;
  searchEngine: WritableSignal<string> = signal<string>("");

  songsToShow = SONGS;
  selectedSong: string | null;

  constructor() {
    this.selectedSong = null;
    this.selectedSong = null;
    let localStorageSongs = this.getFromLocalStorage;
    if (localStorageSongs !== null) {
      localStorageSongs.forEach((element: any) => {
        console.log(element);
        
        this.songsToShow.push(
          {
            artist: element[0],
            cover: element[1],
            description: element[2],
            favorite: element[3],
            mp3Url: element[4],
            title: element[5],
  
          }
        );
        console.log(this.songsToShow);
      });
    }
  }

  selectSong(song: any) {
    this.songTitle.set(song.title);
    this.songImage.set(song.cover);
    this.artistName.set(song.artist);
    this.isFavorite.set(song.favorite);
    this.description.set(song.description);
    this.songUrl.set(song.mp3Url);

    this.selectedSong = song.mp3Url;
    console.log(song.mp3Url)
  }

  openForm() {
    this._openForm = !this._openForm;
  }

  addSong(songInfo: any) {
    console.log(songInfo);
    this.saveToLocalStorage(songInfo);
  }
  

  saveToLocalStorage(data: any[]) {
    let storedSongs: string | null = localStorage.getItem('songs');
    if (storedSongs !== null) {
      let songsList: any = JSON.parse(storedSongs);
      songsList.push(data);
      localStorage.setItem('songs', JSON.stringify(songsList));
    } else {
      localStorage.setItem('songs', JSON.stringify([data]));
    }
    
    this.songsToShow.push({
      'title': data[0],
      'artist': data[1],
      'favorite': data[2],
      'description': data[3],
      'mp3Url': data[4],
      'cover': data[5]
    });
    console.log(this.songsToShow);
  }

  get getFromLocalStorage() {
    let songs = localStorage.getItem('songs');
    if (songs) {
      let formattedSongs = JSON.parse(songs);
      console.log(formattedSongs)
      return formattedSongs;
    } else return null;
  }

  changeFavoriteImage(song: any) {
    console.log(song);
    song.favorite = !song.favorite
  }
}

// interface MusicType {
//   title: string,
//   artist: string,
//   favorite: boolean,
//   description: string,
//   mp3Url: string,
//   cover: string
// }