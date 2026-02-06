import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { NhtsaService } from '../../service/nhtsa-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vin',
  imports: [FormsModule],
  templateUrl: './vin.html',
  styleUrl: './vin.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Vin {
  private nhtsaService: NhtsaService = inject(NhtsaService);
  
  vin: WritableSignal<string>;
  results: WritableSignal<any[]>;

  constructor() {
    this.results = signal<any[]>([]);
    this.vin = signal<string>('');
  }

  searchVin() {
    if ((this.vin().trim() !== '' || this.vin().trim() !== '') && this.vin().length !== 17) {
     return;
    }
    this.results.set([]);
    this.nhtsaService.getDetailsByVin(this.vin()).subscribe({
      next: (res: any) => {
        Object.entries(res.Results[0]).forEach(([key, val]: any) => {
          this.results.update((vals: any) => [
            ...vals, (val === '' ? `${key} - N/A` : `${key} - ${val}`)
          ])
        })
      },
      error: (err: any) => {
        console.error('Error al fer la consulta per recuperar les dades del bastidor:', err);
      }
    });
  }

  get getResults() {
    return this.results.asReadonly();;
  }
}
