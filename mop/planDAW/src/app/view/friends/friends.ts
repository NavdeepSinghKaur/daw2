import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Add } from '../../service/add';
import { Fetch } from '../../service/fetch';
import { Friend } from '../../model/friend';


@Component({
  selector: 'app-friends',
  imports: [FormsModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {

  friendsList: WritableSignal<Friend[]>;
  name: string;
  role: string;

  constructor(
    private fetchService: Fetch,
    private addService: Add
  ) {
    this.name = "";
    this.role = "";
    // const initialFriends = fetchService.getFirends || [];
    this.friendsList = signal<Friend[]>(fetchService.getFirends);
    // console.log('initial friends', this.friendsList());
  }

  get getFriends() {
    return this.friendsList.asReadonly();
  }

  createFriend() {
    let newFriend: Friend = {
      name: this.name,
      role: this.role
    };

    this.addService.addFriend(newFriend);
    // const updated =  || [];
    this.friendsList.set(this.fetchService.getFirends);

    // reset the form fields
    this.name = '';
    this.role = '';
  }

}
