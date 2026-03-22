import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './views/menu/menu';
import { Auth, authState } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dawscovery');

  private _auth: Auth = inject(Auth);

  public isLogged: WritableSignal<User | null>;

  constructor() {
    this.isLogged = signal<User | null>(null);
  }

  ngOnInit() {
    authState(this._auth).subscribe((user: User | null) => {
      this.isLogged.set(user);
    });
  }
}
