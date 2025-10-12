import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cardsList } from '../../CardsList';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() cardIndex!: number;
  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

  cardsList = cardsList;
  route = 'assets/cardsDeck/';
  extension = '.png';
  showCard = true;

  constructor() {
    setTimeout(() => {
      this.showCard = false;
    }, 3000);
  }

  cardClicked() {
    this.showCard = true;
    this.clicked.emit(this.cardIndex);
  }
}
