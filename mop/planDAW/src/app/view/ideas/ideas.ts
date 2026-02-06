import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Plan } from '../../model/plan';
import { Fetch } from '../../service/fetch';
import { Add } from '../../service/add';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ideas',
  imports: [],
  templateUrl: './ideas.html',
  styleUrl: './ideas.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ideas {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private fetchService: Fetch = inject(Fetch);
  private addService: Add = inject(Add);
  
  isRouteFavorite: boolean;
  private _ideas: WritableSignal<Plan[]>;

  constructor() {
    this.isRouteFavorite = this._activatedRoute.snapshot.paramMap.get('favs') === 'favs';
    if (this.isRouteFavorite) {
      this._ideas = signal(this.fetchService.getFavoriteIdeas);
    } else {
      this._ideas = signal(this.fetchService.getIdeasFromLocalStorage);
    }
  }

  get getIdeas() {
    return this._ideas.asReadonly();
  }

  likeIdea(idea: Plan) {
    this.addService.likeIdea(idea);
  }
}
