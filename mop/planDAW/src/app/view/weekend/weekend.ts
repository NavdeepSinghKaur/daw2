import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateWeekPlan } from '../../service/create-week-plan';
import { Fetch } from '../../service/fetch';
import { Plan } from '../../model/plan';
import { Add } from '../../service/add';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weekend',
  imports: [FormsModule],
  templateUrl: './weekend.html',
  styleUrl: './weekend.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Weekend {
  private addService: Add = inject(Add);
  private weekendPlanService: CreateWeekPlan = inject(CreateWeekPlan);
  private fetchPlansService: Fetch = inject(Fetch);
  private _images: WritableSignal<string[]>;
  description: WritableSignal<any> = signal('');
  title: WritableSignal<string> = signal('');
  duration: WritableSignal<string> = signal('');
  image: WritableSignal<string> = signal('');
  type: WritableSignal<string> = signal('');

  constructor() {
    this.weekendPlanService.getResponse.then(res => {
      console.log(res);
      this.description.set(res.content?.replace("\"", ''));
    });

    let ideas: string[] = [];
    this.fetchPlansService.getAllIdeas.forEach(
      plan => {
        ideas.push(plan.image);
      });

    this._images = signal(ideas);
    console.log(this._images());
  }

  generateNewIdea() {
    let idea: Plan = {
      title: this.title(),
      description: this.description(),
      image: this.image(),
      mood: this.type(),
      duration: this.duration(),
      isFavorite: false,
    }

    this.addService.setToLocalStorage('ideas', idea, false);

    this.description.set('');
    this.title.set('');
    this.duration.set('');
    this.image.set('');
    this.type.set('');
  }

  get getAllImages() {
    return this._images();
  }
  
}
