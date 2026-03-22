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

  public friends: Signal<string[] | null>;
  public pending: Signal<string[]>;
  public sent: WritableSignal<string[] | null>;
  public currentUser: WritableSignal<user2 | null>;
  public targetUser: WritableSignal<string>;

  constructor() {
    this.friends = signal(null);
    this.pending = signal(['']);
    this.sent = signal(null);
    this.currentUser = signal(this._auth.currentUser);
    this.targetUser = signal('');
  }

  ngOnInit() {
    const email = this._auth.currentUser?.email!;

    this._userService.getUser(email).then((user: any) => {
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
    try {
      this._userService.addConnection(from, to);
    } catch (error: any) {
      console.error("An error has occured: ", error);
    }
  }

  acceptRequest(from: string) {
    const to = this.currentUser()?.email || this._auth.currentUser?.email;

    if (!from || !to) {
      console.error('Cannot accept request: User email is undefined.');
      return;
    }
    try {
      this._userService.acceptConnection(from, to);
    } catch(error: any) {
      console.error("An error has occured: ", error);
    }
  }

  rejectRequest(from: string) {
    const to = this.currentUser()?.email || this._auth.currentUser?.email;

    if (!from || !to) {
      console.error('Cannot reject request: User email is undefined.');
      return;
    }

    try {
      this._userService.rejectConnection(from, to);
    }catch(error: any) {
      console.error("An error has occured while rejecting the connection request:", error);
    }
  }

  getAllFriends() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getConnections(user).subscribe({
      next: (users: any) => {
        users as User[]
        this.friends = signal(users);
      },
      error: (error: any) => {
        console.error("Cannot retrieve friends. Error trace: ", error);
      }
    });
  }

  getPendingConnections() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getPendingConnections(user).subscribe({
      next: (res: any) => {
        this.pending = signal(res);
      },
      error: (error: any) =>  {
        console.error(error);
      }
    });
  }

  getSentConnections() {
    const user: string | null = this._auth.currentUser?.email!;
    this._userService.getSentRequests(user).subscribe({
      next: (res: any) => {
        this.sent.set(res);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}