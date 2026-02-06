import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cardsList } from '../../shared';

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
  
  cardClicked() {
    this.hideCard = false;
    this.clicked.emit(this.cardIndex);
  }
}
