import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() imagePath!: any;
  selectedImage = "assets/cardsDeck/back_card.png";

  constructor() {

  }

  changeImage() {
    this.selectedImage = this.imagePath
  }

}
