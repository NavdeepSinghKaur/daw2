import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user-service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  private _userService: UserService = inject(UserService);
  private _auth = inject(Auth);
  private user: WritableSignal<any> = signal<any>(null);

  constructor() {
  }

  async ngOnInit() {
    const res = await this._userService.getUser(this._auth.currentUser!.email!)
    this.user.set(res);
  }

  get getUser() {
    return this.user
  }
}
