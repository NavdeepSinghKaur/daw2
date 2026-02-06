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
  protected openForm: boolean = false;
  searchEngine: WritableSignal<string>;

  songsToShow: WritableSignal<MusicType[]>;
  selectedSong: WritableSignal<MusicType | null>;

  constructor() {
    this.searchEngine = signal<string>("");
    this.selectedSong = signal(null);
    let localStorageSongs = this.getFromLocalStorage;
    if (localStorageSongs !== null) {
      SONGS.forEach((song: MusicType) => {
  
        let skipSong = false;

        localStorageSongs.forEach((storedSong: MusicType) => {
          if (this.compare(song, storedSong)) {
            skipSong = true
          }
        });

        if (!skipSong) {
          this.saveToLocalStorage(song)
        }
      });
    } else {
      localStorage.setItem('songs', JSON.stringify(SONGS));
    }

    this.songsToShow = signal(this.getFromLocalStorage);
  }

  selectSong(song: MusicType) {
    this.selectedSong.set(
      song
    )

  }

  closeOpenForm(): void {
    this.openForm = !this.openForm;
  }

  addSong(songInfo: MusicType): void {
    this.saveToLocalStorage(songInfo);
    this.songsToShow.update(songs => [...songs, songInfo]);
  }
  

  saveToLocalStorage(data: MusicType): void {
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
    this.openForm = false;
  }

  get getFromLocalStorage() {
    let songs = localStorage.getItem('songs');
    if (songs) {
      let formattedSongs = JSON.parse(songs);
      return formattedSongs;
    } 
    
    return null;
  }

  changeFavoriteImage(song: any): void {
    this.songsToShow.update((songs: MusicType[]) => {
      return songs.map(arrSong => {

        if (this.compare(arrSong, song)) {
          return { ...arrSong, favorite: !arrSong.favorite };
        }

        return arrSong;
      });
    });
    
    this.selectedSong.set({ ...this.selectedSong()!, favorite: !this.selectedSong()!.favorite });
    
    localStorage.setItem('songs', JSON.stringify(this.songsToShow()))
  }

  close(): void {
    this.selectedSong.set(null);
  }

  private compare(song1: MusicType, song2: MusicType): boolean {
    return (
      song1.artist === song2.artist
      && song1.cover === song2.cover
      && song1.description === song2.description
      && song1.mp3Url === song2.mp3Url
      && song1.title === song2.title
    );
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