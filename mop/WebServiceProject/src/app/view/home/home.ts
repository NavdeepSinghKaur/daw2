import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../model/UserModel';
import { GoogleAuth } from '../../service/google/google-auth';

@Component({
  selector: 'app-home',
  imports: [ FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
  googleAuthSrv: GoogleAuth = inject(GoogleAuth);
  user: WritableSignal<UserModel>;

  constructor() {
    this.user = signal<UserModel>({
      id: '',
      given_name: '',
      name: '',
      family_name: '',
      picture: ''
    });
  }
  
  async ngOnInit() {

    (await this.googleAuthSrv.getUserData()).subscribe({
      next: (res: any) => {

        const loggedUser: UserModel = {
          id: res.id,
          given_name: res.given_name,
          family_name: res.family_name,
          picture: res.picture,
          name: res.name
        }
        this.user.set(loggedUser);
      },

      error: (err: any) => {
        console.log('S\'ha produït un error en obtenir dades:', err);
      }
    });

  }
}
