import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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

  public async login() {
    this._user.username = this.username();
    this._user.password = this.password();

    await this._authSrv.login(this._user)

    this._router.navigate(['']);
  }
}
