import { ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Add } from '../../service/add';
import { Fetch } from '../../service/fetch';
import { Friend } from '../../model/friend';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-friends',
  imports: [FormsModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Friends {
  private fetchService: Fetch = inject(Fetch);
  private addService: Add = inject(Add);
  private toastService: ToastrService = inject(ToastrService);

  friendsList: WritableSignal<Friend[]>;
  name: WritableSignal<string>;
  role: WritableSignal<string>;


  constructor() {
    this.name = signal("");
    this.role = signal("");
    
    this.friendsList = signal<Friend[]>(this.fetchService.getFirends);
  }

  get getFriends(): Signal<Friend[]> {
    return this.friendsList.asReadonly();
  }

  createFriend(): void {
    if (this.name().trim().length == 0 || this.role().trim().length <= 2) {
      this.toastService.error("El nom o rol no son válids!");
      return;
    }
    
    let newFriend: Friend = {
      name: this.name(),
      role: this.role()
    };

    this.addService.addFriend(newFriend);
    
    this.friendsList.set(this.fetchService.getFirends);
    
    this.toastService.success("S'ha guardat l'amic correctament!");

    this.name.set('');
    this.role.set('');
  }

}
