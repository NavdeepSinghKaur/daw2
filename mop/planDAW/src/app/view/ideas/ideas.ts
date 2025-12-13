import { Component, inject, input } from '@angular/core';
import { Plan } from '../../model/plan';
import { Fetch } from '../../service/fetch';
import { Add } from '../../service/add';

@Component({
  selector: 'app-ideas',
  imports: [],
  templateUrl: './ideas.html',
  styleUrl: './ideas.css',
})
export class Ideas {
  // storedIdeas = input.required<Plan[]>();

  private fetchService: Fetch = inject(Fetch);
  private addService: Add = inject(Add);

  constructor() {

  }

  get getIdeasFromArray() {
    console.log(this.fetchService.getIdeasFromArray);
    return this.fetchService.getIdeasFromArray;
  }

  get getFavoriteIdeas() {
    return this.fetchService.getIdeasFromLocalStorage;
  }

  get getAllIdeas() {
    return this.fetchService.getAllIdeas;
  }

  likeIdea(idea: Plan) {
    if (idea.isFavorite === false) {
      idea.isFavorite = true;
      this.addService.insertFavoriteIdea(idea)
    } else{
      idea.isFavorite = false;
    }
  }

}
