import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { cardsList } from '../../shared';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  cardIndex: InputSignal<number> = input.required();
  inputHideCard: InputSignal<boolean> = input.required();
  clicked: OutputEmitterRef<number> = output<number>();

  cardsList: WritableSignal<any>;

  constructor() {
    this.cardsList = signal(cardsList);
  }
  
  cardClicked(): void {
    this.clicked.emit(this.cardIndex());
  }
}
