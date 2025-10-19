import { Component } from '@angular/core';
import { Alumnes } from './alumnes/alumnes';

@Component({
  selector: 'app-root',
  imports: [ Alumnes ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
