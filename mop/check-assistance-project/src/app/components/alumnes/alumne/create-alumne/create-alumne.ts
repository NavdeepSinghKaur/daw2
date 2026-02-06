import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalstorageHandler } from '../../../../services/localstorage-handler';

@Component({
  selector: 'app-create-alumne',
  imports: [FormsModule],
  templateUrl: './create-alumne.html',
  styleUrl: './create-alumne.css'
})
export class CreateAlumne {
  localstorageSrv: LocalstorageHandler;
  name!: string;

  constructor() {
    this.localstorageSrv = inject(LocalstorageHandler);
  }

  saveAlumne() {
    this.localstorageSrv.saveAlumne(this.name)
    this.name = "";
  }
}
