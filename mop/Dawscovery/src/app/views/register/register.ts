import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private _user: User;

  private _authSrv: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

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

  public async register() {
    this._user = {
      connections: [],
      username: this.username(),
      posts: [],
      connectionFrom: [],
      connectionTo: [],
      password: this.password(),
      postLists: [],
    }
    const res = await this._authSrv.register(this.username(), this.password());
    if (res) {
      this._router.navigate(['/']);
    }
  }

}
