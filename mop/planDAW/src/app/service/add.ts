import { inject, Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { Friend } from '../model/friend';
import { Fetch } from './fetch';

@Injectable({
  providedIn: 'root',
})
export class Add {
  private fetchService: Fetch = inject(Fetch);

  constructor() {

  }


  likeIdea(idea: Plan) {
    let ideas = this.fetchService.getIdeasFromLocalStorage;

    ideas.forEach((storedIdea: Plan) => {
      if (this.areEqual(idea, storedIdea)) {
        idea.isFavorite = !storedIdea.isFavorite;
      }
    });

    this.setToLocalStorage('ideas', idea, true);
  }

  addFriend(friend: Friend) {
    this.setToLocalStorage('friends', friend);
  }

  setToLocalStorage(name: string, item: any, isUpdate: boolean = false) {
    let storedItem = localStorage.getItem(name);
    let parsedStoredItem: any[] = []; 
    if (storedItem) {
      parsedStoredItem = JSON.parse(storedItem);
      
      if (name == 'ideas' && isUpdate) {
        for (let i = 0; i < parsedStoredItem.length; i++) {
          if (this.areEqual(item, parsedStoredItem[i])) {
            parsedStoredItem.splice(i, 1);
          }
        }
      }
    }

    parsedStoredItem.push(item);
    localStorage.setItem(name, JSON.stringify(parsedStoredItem));
  }

  areEqual(idea1: Plan, idea2: Plan) {
    return (
      idea1.description === idea2.description 
      && idea1.duration === idea2.duration
      && idea1.image === idea2.image
      && idea1.mood === idea2.mood
      && idea1.title === idea2.title);
  }

}
