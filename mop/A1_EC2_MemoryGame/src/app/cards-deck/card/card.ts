import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cardsList, finishedCards } from '../../CardsList';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() cardIndex!: number;
  @Input() hideCard?: boolean;
  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

  cardsList = cardsList;
  route = 'assets/cardsDeck/';
  extension = '.png';

  cardClicked() {
    this.hideCard = false;
    this.clicked.emit(this.cardIndex);
  }
}
