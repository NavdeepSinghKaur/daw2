import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { User as user2 } from '@angular/fire/auth';
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

  public friends: WritableSignal<string[] | null> = signal(null);
  public pending: WritableSignal<string[] | null> = signal(null);
  public sent: WritableSignal<string[] | null> = signal(null);

  public currentUser: WritableSignal<user2 | null>;
  public targetUser: WritableSignal<string>;

  constructor() {
    console.log(this._auth.currentUser);
    // this.currentUser = signal(this._auth.currentUser);
    // const user: string | null = this._auth.currentUser?.email!;
    this.currentUser = signal(this._auth.currentUser);
    this.targetUser = signal('');
  }

  ngOnInit() {
    const email = this._auth.currentUser?.email!;
    console.log(email);
    this._userService.getUser(email).subscribe((user: any) => {
      console.log(user);
      this.currentUser.set(user);
    });

    this.getAllFriends();
    this.getPendingConnections();
    this.getSentConnections();
  }

  sendRequest() {
    const from = this.currentUser()?.email || this._auth.currentUser?.email;
    const to = this.targetUser();

    if (!from || !to) {
      console.error('Cannot send request: User email is undefined.');
      return;
    }
    this._userService.addConnection(from, to);
  }

  acceptRequest(from: string) {
    const to = this.currentUser()?.email || this._auth.currentUser?.email;

    if (!from || !to) {
      console.error('Cannot accept request: User email is undefined.');
      return;
    }
    this._userService.acceptConnection(from, to);
  }

  rejectRequest(from: string) {
    const to = this.currentUser()?.email || this._auth.currentUser?.email;

    if (!from || !to) {
      console.error('Cannot reject request: User email is undefined.');
      return;
    }
    this._userService.rejectConnection(from, to);
  }

  getAllFriends() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getConnections(user).subscribe({
      next: (users) => {
        this.friends.set(users);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getPendingConnections() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getPendingConnections(user).subscribe({
      next: (res) => {
        this.pending.set(res);
        console.log(res);
      }
    });
  }

  getSentConnections() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getSentRequests(user).subscribe({
      next: (res) => {
        this.sent.set(res);
        console.log(res);
      }
    });
  }

}