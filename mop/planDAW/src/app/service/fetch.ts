import { Injectable } from '@angular/core';
import { PLANS } from '../model/plans_ideas';
import { Plan } from '../model/plan';
import { Friend } from '../model/friend';

@Injectable({
  providedIn: 'root',
})
export class Fetch {
  private _plans: Plan[];

  constructor() {
    this._plans = PLANS;
  }

  get getIdeasFromArray() {
    return this._plans;
  }

  get getIdeasFromLocalStorage() {
    return this.getFromLocalStorage('ideas');
  }

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

  get getFavoriteIdeas() {
    let allIdeas: Plan[] = [];

    const localStorageIdeas: Plan[] | false = this.getIdeasFromLocalStorage;

    if (localStorageIdeas) {
      localStorageIdeas.forEach((idea: Plan) => {
        if (idea.isFavorite) {
          allIdeas.push(idea);
        }
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
