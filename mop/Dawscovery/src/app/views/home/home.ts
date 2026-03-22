import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Auth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private _userService: UserService = inject(UserService);

  public user: WritableSignal<User | null>;
  private _auth: any = inject(Auth);

  constructor() {
    this.user = signal(null);
  }
  
  async ngOnInit() {
    try {
      const user = await this._userService.getUser(this._auth.currentUser?.email);
      this.user.set(user)
    } catch(error: any) {
      console.error("An error has occured while fetching the user data. Error trace: ", error);
    }
  }

  get getUser() {
    return this.user.asReadonly();
  }
}
