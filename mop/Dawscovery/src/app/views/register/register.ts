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

    } catch(error: any) {
      
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
