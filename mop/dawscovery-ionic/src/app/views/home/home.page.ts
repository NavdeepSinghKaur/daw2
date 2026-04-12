import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonApp, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user-service';
import { AuthService } from 'src/app/services/auth-service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  private _userService: UserService = inject(UserService);
  private _auth = inject(Auth);
  private user: WritableSignal<any> = signal<any>(null);

  constructor() {

  }

  ngOnInit() {
    this.user.set(this._userService.getUser(this._auth.currentUser?.email ?? ''));
  }

  get getUser() {
    return this.user
  }
}
