import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connections',
  imports: [FormsModule],
  templateUrl: './connections.html',
  styleUrl: './connections.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Connections implements OnInit {

  private _auth: Auth = inject(Auth);
  private _userService: UserService = inject(UserService);
  public friends: WritableSignal<User[] | null> = signal(null);

  public currentUser: WritableSignal<User | null>;
  public targetUser: WritableSignal<string>;

  constructor() {
    this.currentUser = signal(null);
    this.targetUser = signal('');
  }

  ngOnInit() {
    const email = this._auth.currentUser?.email!;
    console.log(email);
    this._userService.getUser(email).subscribe((user: any) => {
      console.log(user);
      this.currentUser.set(user);
    });

    // this.friends.set(this.getAllFriends());
  }

  sendRequest() {
    const from = this._auth.currentUser?.email!;
    const to = this.targetUser();
    this._userService.addConnection(from, to);
  }

  acceptRequest(from: string) {
    const to = this._auth.currentUser?.email!;
    this._userService.acceptConnection(from, to);
  }

  getAllFriends() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getConnections(user).subscribe({
      next: (users) => {
        console.log(users);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

}