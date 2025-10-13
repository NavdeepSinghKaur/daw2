import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localstorage-message',
  imports: [FormsModule],
  templateUrl: './localstorage-message.html',
  styleUrl: './localstorage-message.css'
})
export class LocalstorageMessage {
  name!: string;
  shuffle!: number;
  
  constructor() {

  }

  logValues() {
    console.log(this.name);
    console.log(this.shuffle);
  }  
}
