import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Menu {
  private authService = inject(AuthService);
  private router = inject(Router);
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}