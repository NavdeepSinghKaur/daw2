import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage {
  private _authSrv: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private errorAtRegister: WritableSignal<string>;
  private _user: User;

  constructor() {
    this._user = {
      connections: [],
      username: '',
      posts: [],
      connectionFrom: [],
      connectionTo: [],
      password: '',
      postLists: [],
    };
    this.username = signal<string>('');
    this.password = signal<string>('');
    this.errorAtRegister = signal<string>('');
  }

  public async register() {

    this._user.username = this.username();
    this._user.password = this.password();

    this.validateFiels();

    try {
      const res = await this._authSrv.register(this.username(), this.password());

      if (res) this._router.navigate(['/']);

    } catch (error: any) {

      this.username.set('');
      this.password.set('');

      this.errorAtRegister.set("Error while generating the user, try again later");
    }
  }

  private validateFiels(): boolean {
    if (this.username() === '' || this.password() === '') {
      this.errorAtRegister.set("el username i password han de contenir un valor");
      return false;
    }

    if (this.username().length < 2 || this.password().length < 8) {
      this.errorAtRegister.set("El username ha de tenir mínim 2 caràcters i el password mínim 8")
      return false;
    }

    return true;
  }

  get getError() {
    return this.errorAtRegister.asReadonly();
  }
}
