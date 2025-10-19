import { Component, EventEmitter, Output } from '@angular/core';
import { alumnesList } from '../shared/alumneList';
import { AlumneModel } from '../shared/alumne.model.';

@Component({
  selector: 'app-localstorage-message',
  imports: [],
  templateUrl: './localstorage-message.html',
  styleUrl: './localstorage-message.css'
})
export class LocalstorageMessage {
  @Output() showComponent = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
    if (localStorage.getItem('alumnes') === null) {
      return this.hideComponent();
    }
  }


  loadLocalStorage() {
    let unformattedAlumnes = localStorage.getItem('alumnes');
    let parsedAlumnes = unformattedAlumnes ? JSON.parse(unformattedAlumnes) : '';
    parsedAlumnes.forEach((alumne: AlumneModel) => {
      alumnesList.push(alumne);
    });

    this.hideComponent();
  }

  hideComponent() {
    this.showComponent.emit(false);
  }

}
