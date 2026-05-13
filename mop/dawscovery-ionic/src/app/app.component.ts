import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle, IonRouterOutlet, IonRouterLink, IonButton } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonButton, IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle, IonRouterOutlet, IonRouterLink, RouterModule],
})
export class AppComponent implements OnInit {

  private _auth: Auth = inject(Auth);
  private _router: Router = inject(Router);
  public logged: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    authState(this._auth).subscribe(user => {
      if (user) {
        this.logged.set(true);
      } else {
        this.logged.set(false);
      }
    });
  }

  async ngOnInit() {
    await SplashScreen.hide();
  }

  public async logout() {
    try {
      await signOut(this._auth);
      this._router.navigate(['/intro']);
    } catch (error: any) {
      console.error(error);
    }
  }
}