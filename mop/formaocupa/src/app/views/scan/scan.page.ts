import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Scanner } from 'src/app/services/scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ScanPage implements OnInit {
  private _scanner: Scanner = inject(Scanner)

  constructor() { }

  ngOnInit() {

  }

  get getBarcode() {
    return this._scanner.scannedBarcode();
  }

}
