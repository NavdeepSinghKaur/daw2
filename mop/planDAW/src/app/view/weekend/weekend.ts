import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateWeekPlan } from '../../service/create-week-plan';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weekend',
  imports: [FormsModule],
  templateUrl: './weekend.html',
  styleUrl: './weekend.css',
})
export class Weekend {
  private weekendPlanService: CreateWeekPlan = inject(CreateWeekPlan);
  response;
  constructor() {
    this.response = this.weekendPlanService.getResponse.then(res => {
      console.log(res);
    });
  }

  
}
