import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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

  public createNewPost: WritableSignal<boolean>;
  public friendsPosts: Signal<Post[] | null>
  public username: Signal<string>;

  public posts: WritableSignal<Post[] | null>;

  constructor() {
    this.posts = signal(null);
    this.username = signal(this._auth.currentUser?.email!).asReadonly();
    this.friendsPosts = signal(null);
    this.createNewPost = signal(false);
  }

  ngOnInit(): void {
    this._postService.getOwnPosts(this._auth.currentUser?.email!).subscribe({
      next: (res: any) => {
        res = res as Post[];
        this.posts.set(res);

      }, error: (error: any) => {
        console.error("Error while fetching posts: ", error);
      }
    });

    this.getFriendsPosts();
  }

  alterCreateNewPost() {
    this.createNewPost.set(!this.createNewPost());
  }

  deletePost(postId: string) {
    try {
      this._postService.deletePost(postId, this._auth.currentUser?.email!);
    } catch(error: any) {
      console.error("Error while deleting post", error);
    }
  }

  get getCreateNewPost() {
    return this.createNewPost.asReadonly();
  }

  getFriendsPosts() {
    this._postService.getFriendsPosts(this._auth.currentUser?.email!).subscribe({
      next: (res: any) => {
        res = res as Post[];
        this.friendsPosts = signal(res);
      },
      error: (error: any) => {
        console.error("Error while fetching friends' posts", error);
      }
    })
  }

  likePost(postId: string) {
    try {
      this._postService.likePost(postId, this._auth.currentUser?.email!);
    } catch (error: any) {
      console.error("Error while liking post", error);
    }
  }

  unlikePost(postId: string) {
    try {
      this._postService.unlikePost(postId, this._auth.currentUser?.email!);
    } catch(error: any) {
      console.error("error while unliking post", error);
    }
  }
}
