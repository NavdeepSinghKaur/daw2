import { ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateWeekPlan } from '../../service/create-week-plan';
import { Fetch } from '../../service/fetch';
import { Plan } from '../../model/plan';
import { Add } from '../../service/add';
import { ToastrService } from 'ngx-toastr';
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
  private toastrService: ToastrService = inject(ToastrService);

  public enableAiButton: WritableSignal<boolean>;
  private _images: WritableSignal<string[]>;
  public description: WritableSignal<string>;
  public title: WritableSignal<string>;
  public duration: WritableSignal<string>;
  public image: WritableSignal<string>;
  public type: WritableSignal<string>;

  constructor() {
    this.enableAiButton = signal(true);
    this.description = signal("");
    this.title = signal('');
    this.duration = signal('');
    this.image = signal('');
    this.type = signal('');

    let ideas: string[] = [];
    this.fetchPlansService.getAllIdeas.forEach(
      plan => {
        ideas.push(plan.image);
      });

    this._images = signal(ideas);
    console.log(this._images());
  }

  generateIdea(): void {
    this.enableAiButton.set(false);
    this.weekendPlanService.getResponse.then(res => {
      let parsedRes = JSON.parse(res.content);

      this.title.set(parsedRes.title);
      this.duration.set(parsedRes.duration);
      this.image.set(parsedRes.image);
      this.description.set(parsedRes.description);
      this.type.set(parsedRes.mood)
      this.enableAiButton.set(true);
    });
  }

  saveIdea() {
    if (this.description().trim().length == 0 
      || this.title().trim().length == 0 
      || this.image().trim().length == 0 
      || this.type().trim().length == 0
      || this.duration().trim().length == 0
    ) {
      this.toastrService.error("Els camps no son vàlids!");
      return;
    }

    let idea: Plan = {
      title: this.title(),
      description: this.description(),
      image: this.image(),
      mood: this.type(),
      duration: this.duration(),
      isFavorite: false,
    }

    this.addService.setToLocalStorage('ideas', idea, false);
    this.toastrService.success("S'ha guardat l'idea!");
    this.description.set('');
    this.title.set('');
    this.duration.set('');
    this.image.set('');
    this.type.set('');
  }

  get getAllImages() {
    return this._images();
  }

  get getEnableAiButton(): Signal<boolean> {
    return this.enableAiButton.asReadonly();
  }
  
}
