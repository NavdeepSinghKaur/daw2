import { Component, input } from '@angular/core';
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

  constructor(
    private fetchService: Fetch,
    private addService: Add
  ) {

  }

  get getIdeasFromArray() {
    console.log(this.fetchService.getIdeasFromArray);
    return this.fetchService.getIdeasFromArray;
  }

  get getFavoriteIdeas() {
    return this.fetchService.getIdeasFromLocalStorage;
  }

  likeIdea(idea: Plan) {
    this.addService.insertFavoriteIdea(idea)
  }

  // private isStoredInLocalStorage() {
  //   this.fetchService.getIdeasFromArray.forEach(idea => {
  //     this.fetchService.getIdeasFromLocalStorage.forEach((element: Plan) => {
  //       if (element.title === idea.title 
  //         && element.description === idea.description 
  //         && element.duration === idea.duration 
  //         && element.image === idea.image 
  //         && element.mood === idea.mood) {

  //         }
  //     });
  //   })
  // }
}
