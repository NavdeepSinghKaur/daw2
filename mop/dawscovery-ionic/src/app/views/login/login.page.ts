import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private _user: User;
  private _router: Router = inject(Router);

  private _authSrv: AuthService = inject(AuthService);

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
  }

  ngOnInit() {

  }

  public async login() {
    this._user.username = this.username();
    this._user.password = this.password();

    await this._authSrv.login(this._user)

    this._router.navigate(['']);
  }
}
