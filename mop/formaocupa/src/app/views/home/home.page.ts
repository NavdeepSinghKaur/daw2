import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonFabButton, IonFab, IonButton, IonItem, IonLabel, IonToast, IonTabs, IonTab, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { Scanner } from 'src/app/services/scanner';
import { ScanQr } from 'src/app/services/scan-qr';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTabButton, IonTabBar, IonTab, IonTabs, IonToast, IonLabel, IonItem, IonButton, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonFabButton, IonFab],
})
export class HomePage {

  private _scanner: Scanner = inject(Scanner);
  private _scanQrSrv: ScanQr = inject(ScanQr);
  private _authSrv: Auth = inject(Auth);

  private visitorsList: WritableSignal<string[]>;
  public visitors: Signal<number>;
  public showVisitorList: WritableSignal<boolean>;
  public visitRegistered: WritableSignal<boolean>;

  constructor() {
    this.visitorsList = signal<string[]>([]);
    this.showVisitorList = signal(false);
    this.visitRegistered = signal(false);

    this.visitors = computed(() => this.visitorsList().length);
  }

  get getBarcode() {
    return this._scanner.scannedBarcode();
  }

  public async scanQr() {
    await this._scanner.scanImage()
    this.visitorsList.update(visitors => [...visitors, this._scanner.scannedBarcode()]);

    await this._scanQrSrv.addVisitor(this._scanner.scannedBarcode());

    const res = this._scanQrSrv.response();

    if (res!.status == 200) {
      this.visitRegistered.set(true);
    } else {
      console.error('Error al registrar la visita: ', res!.error);
    }
  }

  get getVisitorsList() {
    return this.visitorsList.asReadonly();
  }

  public showVisitorsList() {
    this.showVisitorList.set(!this.showVisitorList());
  }

  get getShowVisitorList() {
    return this.showVisitorList.asReadonly();
  }

  public setVisitedMessage() {
    this.visitRegistered.set(false);
  }

  get getVisitedMessage() {
    return this.visitRegistered.asReadonly();
  }

  public async logout() {
    this._authSrv.logout();
  }
}
