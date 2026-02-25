import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './views/menu/menu';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Dawscovery-max');
  authService = inject(AuthService);
}
