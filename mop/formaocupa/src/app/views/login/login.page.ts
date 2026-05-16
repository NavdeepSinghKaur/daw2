import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonList, IonCardHeader, IonCardContent, IonCardTitle, IonInput, IonItem, IonButton, IonToast } from '@ionic/angular/standalone';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonToast, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonList, IonCardHeader, IonCardContent, IonCardTitle, IonInput, IonItem, IonButton]
})
export class LoginPage implements OnInit {

  private authSrv: Auth = inject(Auth);

  public username: WritableSignal<string>;
  public password: WritableSignal<string>;

  public isError: WritableSignal<boolean>;
  private _errorMessage: WritableSignal<string>;
  public errorMessage: Signal<string> = computed(() => this._errorMessage());

  constructor() {
    this.username = signal('admin')
    this.password = signal('admin')

    this.isError = signal(false);
    this._errorMessage = signal('')
  }

  ngOnInit() {
  }

  login() {
    if (this.username() !== '' && this.password() !== '') {
      this.authSrv.login(this.username(), this.password())
    } else {
      this.isError.set(true);
      this._errorMessage.set('Usuari i/o contrasenya buits');
    }
  }

  setErrorVariable() {
    this.isError.set(false);
  }
}
