import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonButton, IonInput, IonItem, IonText } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/models/user.model';
import { Auth, user, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, CommonModule, IonButton, IonInput, IonItem, FormsModule, RouterModule, IonText]
})
export class LoginPage implements OnInit {
  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private _user: User;
  private _router: Router = inject(Router);

  private _authSrv: AuthService = inject(AuthService);

  constructor() {
    this._user = {
      connections: [],
      username: '',
      posts: [],
      connectionFrom: [],
      connectionTo: [],
      password: '',
      postLists: [],
    };
    this.username = signal<string>('');
    this.password = signal<string>('');
  }

  ngOnInit() {

  }

  private auth: Auth = inject(Auth);

  user$: Observable<any> = user(this.auth);

  async loginGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this._user.username = result.user.email!

      await this._authSrv.login(this._user)
      this._router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }


  public async login() {
    this._user.username = this.username();
    this._user.password = this.password();

    await this._authSrv.login(this._user)

    this._router.navigate(['']);
  }
}
