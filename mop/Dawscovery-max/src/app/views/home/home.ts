import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../../models/post';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

  private postService = inject(PostService);

  // toSignal() subscribes to the Observable and keeps the signal
  // updated automatically whenever Firestore sends new data
  posts = toSignal(this.postService.getPosts, { initialValue: [] as Post[] });

  async savePost(postId: string) {
    await this.postService.savePost(postId);
  }
}