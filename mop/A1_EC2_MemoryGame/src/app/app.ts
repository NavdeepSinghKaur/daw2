import { Component, signal } from '@angular/core';
import { CardsDeck } from './cards-deck/cards-deck';

@Component({
  selector: 'app-root',
  imports: [CardsDeck],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
