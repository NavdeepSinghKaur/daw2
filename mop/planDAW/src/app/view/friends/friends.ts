import { Component, inject, signal, WritableSignal } from '@angular/core';
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

  private fetchService: Fetch = inject(Fetch);
  private addService: Add = inject(Add);

  constructor() {
    this.name = "";
    this.role = "";
    
    this.friendsList = signal<Friend[]>(this.fetchService.getFirends);
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
