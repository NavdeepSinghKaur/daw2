import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  username = '';
  password = '';
  error = signal<string | null>(null);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login(this.username, this.password).then(() => {
      this.router.navigate(['/home']);
    });
  }
}