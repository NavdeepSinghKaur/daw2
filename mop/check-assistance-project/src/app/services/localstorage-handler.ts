import { Injectable } from '@angular/core';
import { AlumneModel } from '../shared/alumne.model';
import { alumnesList } from '../shared/alumneList';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageHandler {
  savedAlumnes: string | null;
  today: Date;

  constructor() {
    this.savedAlumnes = localStorage.getItem('alumnes');
    this.today = new Date();
  }

  get getAlumnes() {
    return this.savedAlumnes;
  }

  get getAssistanceList() {
    return JSON.parse(localStorage.getItem('assistances')!);
  }

  saveAlumne(name: string) {
    if (name.trim().length > 1) {
      let newAlumne: AlumneModel = {
        name: name,
        id: alumnesList.length + 1,
        isPresent: undefined,
      };
      alumnesList.push(newAlumne);
      localStorage.setItem('alumnes', JSON.stringify(alumnesList));
    }
  }

  loadLocalStorage(): void | boolean {
    if (this.savedAlumnes) {
      let parsedAlumnes = JSON.parse(this.savedAlumnes);

      parsedAlumnes.forEach((alumne: AlumneModel) => {
        alumnesList.push(alumne);
      });

    } else {
      return false;
    }
  }

  saveList() {
    let storedAssistances = localStorage.getItem('assistances');
    let listName = `${this.today.getFullYear()}${this.today.getMonth()}${this.today.getDate()}_ASSISTANCE`;

    if (storedAssistances !== null) {
      let formattedAssistances = JSON.parse(storedAssistances);
      formattedAssistances = formattedAssistances.filter((element: string) => listName !== element[0]);
      formattedAssistances.push([listName, alumnesList]);
      
      localStorage.setItem('assistances', JSON.stringify(formattedAssistances));

    } else {
      let assistanceToday = [listName, alumnesList];
      
      localStorage.setItem('assistances', JSON.stringify([assistanceToday]));
    }
  }


}
