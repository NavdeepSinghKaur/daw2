import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { alumnesList, assistenciaList } from '../../../shared/alumneList';
import { AlumneModel } from '../../../shared/alumne.model.';

@Component({
  selector: 'app-create-alumne',
  imports: [FormsModule],
  templateUrl: './create-alumne.html',
  styleUrl: './create-alumne.css'
})
export class CreateAlumne {
  name!: string;

  constructor() {
  }

  cleanInput() {
    this.name = ""
  }

  saveAlumne() {
    if (this.name.trim().length < 1) {
      return;
    }

    let newAlumne: AlumneModel = {name: this.name, id: alumnesList.length +1, isPresent: undefined}

    alumnesList.push(newAlumne);
    assistenciaList.push('');

    localStorage.setItem("alumnes", JSON.stringify(alumnesList));
  
    this.cleanInput();
  }
}
