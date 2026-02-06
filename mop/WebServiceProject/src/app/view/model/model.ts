import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NhtsaService } from '../../service/nhtsa-service';

@Component({
  selector: 'app-model',
  imports: [FormsModule],
  templateUrl: './model.html',
  styleUrl: './model.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Model {
  private nhtsaSrv: NhtsaService = inject(NhtsaService);

  make: WritableSignal<string>;
  model: WritableSignal<string>;
  year: WritableSignal<number>;
  results: WritableSignal<any>;

  constructor() {
    this.make = signal<string>('');
    this.model = signal<string>('');
    this.year = signal<number>(new Date().getFullYear());
    this.results = signal<any>([]);
  }
  
  getData() {
    if (this.make().trim() === '' || this.model().trim() === '' || this.year() <= 1950) {
      return;
    }

    this.nhtsaSrv.getDetailsByModel(this.make(), this.model(), this.year()).subscribe({
      next: (res: any) => {
        res.Results.forEach(async (element: any) => {
          this.nhtsaSrv.getDetailsById(element.VehicleId).subscribe({
            next: (res: any) => {
              const newValues: string[] = [
                res.Results[0].FrontCrashPicture,
                res.Results[0].FrontCrashPassengersideRating, 
                res.Results[0].FrontCrashDriversideRating, 
                res.Results[0].OverallRating,
                res.Results[0].OverallFrontCrashRating,
                res.Results[0].FrontCrashVideo,              
              ];
              this.results.update(vals => [
                ...vals, newValues             
              ]);
            }
          });
        });
      },
      error: (err: any) => {
        console.error('S\'ha produït un error:', err);
      }
    })
  }
}
