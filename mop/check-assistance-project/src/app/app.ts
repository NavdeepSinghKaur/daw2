import { Component } from '@angular/core';
import { Alumnes } from './components/alumnes/alumnes';
import { LocalstorageMessage } from "./components/localstorage-message/localstorage-message";

@Component({
  selector: 'app-root',
  imports: [Alumnes, LocalstorageMessage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showLocalstorageComponent: boolean;

  constructor() {
    this.showLocalstorageComponent = true;
  }

  getLocalstorageComponentEvent(showComponent: boolean) {
    this.showLocalstorageComponent = showComponent;
  }
}
