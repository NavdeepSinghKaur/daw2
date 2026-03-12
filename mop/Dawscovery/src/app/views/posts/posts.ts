import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../services/post-service';
import { CreatePost } from './create-post/create-post';
import { Auth } from '@angular/fire/auth';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  imports: [CreatePost],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts implements OnInit {

  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);
  public createNewPost: WritableSignal<boolean> = signal(false);
  public friendsPosts: WritableSignal<Post[] | null> = signal(null);

  public posts: WritableSignal<Post[] | null>;

  constructor() {
    this.posts = signal(null);

    let username = this._auth.currentUser?.email!;
    console.log(username)
    this._postService.getOwnPosts(username).subscribe(res => { console.log(res) });
  }

  ngOnInit(): void {
    this._postService.getOwnPosts(this._auth.currentUser?.email!).subscribe({
      next: (res) => {
        res = res as Post[];
        this.posts.set(res);
      }
    });

    this.getFriendsPosts();
  }

  alterCreateNewPost() {
    this.createNewPost.set(!this.createNewPost());
  }

  deletePost(postId: string) {
    this._postService.deletePost(postId, this._auth.currentUser?.email!);
  }

  get getCreateNewPost() {
    return this.createNewPost.asReadonly();
  }

  getFriendsPosts() {
    this._postService.getFriendsPosts(this._auth.currentUser?.email!).subscribe({
      next: (res) => {
        res = res as Post[];
        this.friendsPosts.set(res);
      }
    })
  }
}
