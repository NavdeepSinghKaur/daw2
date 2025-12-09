import { Injectable } from '@angular/core';
import { PLANS } from '../model/plans_ideas';
import { Plan } from '../model/plan';
import { Friend } from '../model/friend';

@Injectable({
  providedIn: 'root',
})
export class Fetch {
  plans = PLANS;

  constructor() {

  }

  // fetches the ideas that are stored on the model
  get getIdeasFromArray() {
    return this.plans;
  }

  // fetches the ideas that are stored on the localstorage
  get getIdeasFromLocalStorage() {
    return this.getFromLocalStorage('ideas');
  }

  // runs both of the previous methods at once
  get getAllIdeas() {
    let allIdeas: Plan[] = this.getIdeasFromArray;

    const localStorageIdeas: Plan[] | false = this.getIdeasFromLocalStorage;

    if (localStorageIdeas) {
      localStorageIdeas.forEach((idea: Plan) => {
        allIdeas.push(idea);
      });
    }
    return allIdeas;
  }

  get getFirends(): Friend[] {
    return this.getFromLocalStorage('friends');
  }

  private getFromLocalStorage(name: string): false | any {
    const item: string | null = localStorage.getItem(name);

    if (item !== null) {
      return JSON.parse(item);
    }
    return false;
  }
}
