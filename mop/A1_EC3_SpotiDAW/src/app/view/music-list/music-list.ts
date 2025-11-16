import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { Player } from "../player/player";
import { AddForm } from "../add-form/add-form";
import { SONGS } from '../../model/songs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-list',
  imports: [Player, AddForm, FormsModule],
  templateUrl: './music-list.html',
  styleUrl: './music-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicList {
  song: WritableSignal<MusicType | null> = signal({
    title: '',
    artist: '',
    favorite: false,
    description: '',
    mp3Url: '',
    cover: ''
  });
  
  

  protected _openForm: boolean = false;
  searchEngine: WritableSignal<string> = signal<string>("");

  songsToShow: WritableSignal<MusicType[]>;
  selectedSong: WritableSignal<string | null> = signal(null);

  constructor() {
    this.selectedSong.set(null);
    // this.selectedSong = null;
    let localStorageSongs = this.getFromLocalStorage;
    if (localStorageSongs !== null) {
      SONGS.forEach((song: MusicType) => {
        // console.log(song);
        let skipSong = false;

        localStorageSongs.forEach((storedSong: MusicType) => {
          if (this.compare(song, storedSong)) {
            console.log(song)
            console.log(storedSong)
            skipSong = true
          }
        });

        if (!skipSong) {
          console.log("saving", song)
          this.saveToLocalStorage(song)
        }
      });
    } else {
      localStorage.setItem('songs', JSON.stringify(SONGS));
    }

    this.songsToShow = signal(this.getFromLocalStorage);
    console.log(this.songsToShow());
  }

  selectSong(song: any) {
    this.song.set({
      title: song.title,
      cover: song.cover,
      artist: song.artist,
      favorite: song.favorite,
      description: song.description,
      mp3Url: song.mp3Url,
    })

    this.selectedSong.set(song.mp3Url);
    console.log(song.mp3Url)
  }

  openForm() {
    this._openForm = !this._openForm;
  }

  addSong(songInfo: any) {
    console.log(songInfo);
    this.saveToLocalStorage(songInfo);
    this.songsToShow.update(songs => [...songs, songInfo]);
  }
  

  saveToLocalStorage(data: MusicType) {
    let storedSongs = localStorage.getItem('songs');
    let formattedSongs;
    if (storedSongs !== null) {
      formattedSongs = JSON.parse(storedSongs);
    }

    let saveSong = true;
    formattedSongs.forEach((song: MusicType) => {
      if (this.compare(song, data)) {
        saveSong = false
      }
    });
    if (saveSong) {
      formattedSongs.push(data);
      localStorage.setItem('songs', JSON.stringify(formattedSongs));
    }
    this._openForm = false;
  }

  get getFromLocalStorage() {
    let songs = localStorage.getItem('songs');
    if (songs) {
      let formattedSongs = JSON.parse(songs);
      return formattedSongs;
    } 
    
    return null;
  }

  changeFavoriteImage(song: any) {
    console.log('kjkjkjkjk')
    console.log(song);
    
    // song.favorite.update(!song.favorite);
    this.songsToShow.update((songs: MusicType[]) => {
      return songs.map(arrSong => {

        if (this.compare(arrSong, song)) {
          return { ...arrSong, favorite: !arrSong.favorite };
        }

        return arrSong;
      });
    });
    
    console.log(this.songsToShow)
    localStorage.setItem('songs', JSON.stringify(this.songsToShow()))
  }

  close() {
    this.selectedSong.set(null);
    this.song.set(null)
  }

  private compare(song1: MusicType, song2: MusicType): boolean {
    return (
      song1.artist === song2.artist
      && song1.cover === song2.cover
      && song1.description === song2.description
      && song1.mp3Url === song2.mp3Url
      && song1.title === song2.title
    )
  }

  closeForm() {
    this._openForm = !this._openForm
  }
  
}

export interface MusicType {
  title: string,
  artist: string,
  favorite: boolean,
  description: string,
  mp3Url: string,
  cover: string
}