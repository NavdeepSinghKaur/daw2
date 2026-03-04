import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private _user: User;

  private _authSrv: AuthService = inject(AuthService);

  constructor() {
    this._user = {
      connections: 0,
      id: 0,
      username: '',
      posts: [],
      pendingConnections: [],
      password: '',
      postLists: [],
    };
    this.username = signal<string>('');
    this.password = signal<string>('');
  }

  public async register() {
    this._user = {
      connections: 0,
      id: 0,
      username: this.username(),
      posts: [],
      pendingConnections: [],
      password: this.password(),
      postLists: [],
    }
    await this._authSrv.register(this._user);
  }
}
