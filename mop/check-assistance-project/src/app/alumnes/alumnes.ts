import { Component } from '@angular/core';
import { Alumne } from './alumne/alumne';
import { alumnesList } from '../shared/alumneList';
import { CreateAlumne } from './alumne/create-alumne/create-alumne';
import { NgStyle } from '@angular/common';
import { LocalstorageMessage } from '../localstorage-message/localstorage-message';



@Component({
  selector: 'app-alumnes',
  imports: [Alumne, CreateAlumne, NgStyle, LocalstorageMessage],
  templateUrl: './alumnes.html',
  styleUrl: './alumnes.css'
})
export class Alumnes {
  showLocalstorageComponent: boolean;
  allAlumnes;
  filter: boolean | undefined;

  constructor() {
    this.showLocalstorageComponent = true;
    this.allAlumnes = alumnesList;
  }

  filterAlumne(filter: boolean | undefined) {
    this.filter = filter;
  }

  getLocalstorageComponentEvent(showComponent: boolean) {
    this.showLocalstorageComponent = showComponent;
  }
}
