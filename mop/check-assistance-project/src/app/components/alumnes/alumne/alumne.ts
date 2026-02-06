import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlumneModel } from '../../../shared/alumne.model';
import { alumnesList } from '../../../shared/alumneList';


@Component({
  selector: 'app-alumne',
  imports: [],
  templateUrl: './alumne.html',
  styleUrl: './alumne.css'
})
export class Alumne {
  @Input() alumne?: AlumneModel;
  @Output() deleteAlumne;


  constructor() {
    this.deleteAlumne = new EventEmitter<AlumneModel[]>;
  }

  deleteUser() {
    for (let index = 0; index < alumnesList.length; index++) {
      if (alumnesList[index].id === this.alumne?.id) {
        alumnesList.splice(index, 1);
      }
    }
    
    localStorage.setItem('alumnes', JSON.stringify(alumnesList));
  } 

  changeState(action: boolean) {
    this.alumne!.isPresent = action;
    localStorage.setItem('alumnes', JSON.stringify(alumnesList));
  }
}
