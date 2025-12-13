import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { Friend } from '../model/friend';

@Injectable({
  providedIn: 'root',
})
export class Add {

  constructor() {

  }

  insertFavoriteIdea(idea: Plan) {
    this.setToLocalStorage('ideas', idea);
  }

  addFriend(friend: Friend) {
    this.setToLocalStorage('friends', friend);
  }

  private setToLocalStorage(name: string, item: any) {
    let storedItem = localStorage.getItem(name);
    let parsedStoredItem = []; 
    if (storedItem) {
      parsedStoredItem = JSON.parse(storedItem);
    }

    parsedStoredItem.push(item);
    localStorage.setItem(name, JSON.stringify(parsedStoredItem));
  }

}
