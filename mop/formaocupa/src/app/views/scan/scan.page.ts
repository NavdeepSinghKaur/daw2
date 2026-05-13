import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Scanner } from 'src/app/services/scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonFab, IonFabButton, IonIcon]
})
export class ScanPage implements OnInit {
  private _scanner: Scanner = inject(Scanner)
  public barcode: Signal<string> = computed(() => this._scanner.scannedBarcode())

  constructor() { }

  ngOnInit() {

  }

  get getBarcode() {
    return this._scanner.scannedBarcode();
  }

  public async scanQr() {
    await this._scanner.scanImage()
  }

}
