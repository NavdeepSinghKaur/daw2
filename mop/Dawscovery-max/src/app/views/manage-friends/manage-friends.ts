import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-manage-friends',
  imports: [FormsModule],
  templateUrl: './manage-friends.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageFriends implements OnInit {

  private userService = inject(UserService);

  // toSignal() keeps the current user's data live — same pattern as home.ts
  currentUser = toSignal(this.userService.getCurrentUser());

  searchUsername = '';
  searchResult = signal<User | null | 'not-found'>('not-found');

  // These hold full User objects resolved from the ID arrays
  friends = signal<User[]>([]);
  pendingUsers = signal<User[]>([]);

  // OnInit runs once after the component is created
  // We use it to load the full user objects from the IDs stored in Firestore
  async ngOnInit() {
    const user = this.currentUser();
    if (!user) return;

    // Resolve friend IDs → full User objects
    if (user.connections?.length) {
      const resolved = await this.userService.getUsersByIds(user.connections);
      this.friends.set(resolved);
    }

    // Resolve received request IDs → full User objects
    if (user.pendingConnections?.from.length) {
      const resolved = await this.userService.getUsersByIds(user.pendingConnections.from);
      this.pendingUsers.set(resolved);
    }
  }

  async search() {
    if (!this.searchUsername.trim()) return;
    const result = await this.userService.findUserByUsername(this.searchUsername.trim());
    // null means Firestore found nothing, so we set 'not-found' sentinel value
    this.searchResult.set(result ?? 'not-found');
  }

  async sendRequest() {
    const target = this.searchResult();
    // Type narrowing — we check it's a User object, not null or 'not-found'
    if (!target || target === 'not-found') return;
    await this.userService.sendFriendRequest(target.id);
    this.searchResult.set(null);
    this.searchUsername = '';
  }

  async accept(requesterId: string) {
    await this.userService.acceptFriendRequest(requesterId);
    // Remove from pending list locally so UI updates instantly
    this.pendingUsers.update(list => list.filter(u => u.id !== requesterId));
  }

  async decline(requesterId: string) {
    await this.userService.declineFriendRequest(requesterId);
    this.pendingUsers.update(list => list.filter(u => u.id !== requesterId));
  }
}