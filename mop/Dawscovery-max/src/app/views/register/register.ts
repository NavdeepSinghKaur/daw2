import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  username = '';
  password = '';
  error = signal<string | null>(null);
  private authService = inject(AuthService);

  onSubmit() {
    this.authService.register(this.username, this.password);
  }
}