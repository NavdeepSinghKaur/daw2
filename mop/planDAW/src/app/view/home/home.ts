import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Fetch } from '../../service/fetch';
import { Add } from '../../service/add';
import { PLANS } from '../../model/plans_ideas';
import { Plan } from '../../model/plan';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private plans = PLANS;
  private fetchServie: Fetch = inject(Fetch);
  private addService: Add = inject(Add);

  constructor() {
    let hasStoredIdeas: boolean = this.fetchServie.getIdeasFromLocalStorage.length > 0;

    if (!hasStoredIdeas) {
      this.plans.forEach((plan: Plan) => {
        this.addService.setToLocalStorage('ideas', plan);
      })
    }
  }
}
