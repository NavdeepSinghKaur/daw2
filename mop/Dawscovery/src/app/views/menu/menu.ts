import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

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

  public logout(): void {
    this._authSrv.logout();
    this._router.navigate(['login']);
  }
}
