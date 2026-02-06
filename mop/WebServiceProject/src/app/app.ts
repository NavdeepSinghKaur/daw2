import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./view/menu/menu";
import { GoogleAuth } from './service/google/google-auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private googleAuthSrv: GoogleAuth = inject(GoogleAuth);
  isLoggedIn: WritableSignal<boolean>;

  constructor() {
    this.isLoggedIn = signal<boolean>(false);
  }

  async ngOnInit(): Promise<void> {
    await this.googleAuthSrv.checkIfTokenExists();

    this.isLoggedIn.set(true);
  }

  get checkIfLoggedIn(): Signal<boolean> {
    return this.isLoggedIn.asReadonly();
  }

  protected readonly title = signal('WebServiceProject');
}
