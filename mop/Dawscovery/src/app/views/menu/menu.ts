import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Auth, authState, User } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-menu',
  imports: [RouterModule,],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {

  private _authSrv: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _auth: Auth = inject(Auth);

  public isLogged = signal<User | null>(null);

  constructor() {
    authState(this._auth).subscribe((user: User | null) => {
      this.isLogged.set(user);
    });
  }

  public logout(): void {
    this._authSrv.logout();
    this._router.navigate(['intro']);
  }
}
