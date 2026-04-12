import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PostsPage implements OnInit {

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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error("error while unliking post", error);
    }
  }
}
