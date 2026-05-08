import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { PostService } from 'src/app/services/post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterModule, IonCardTitle]
})
export class PostsPage implements OnInit {

  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);

  public createNewPost: WritableSignal<boolean>;
  public friendsPosts = this._postService.friendsPosts;
  public username: Signal<string>;

  public posts = this._postService.ownPosts;

  constructor() {
    this.username = signal(this._auth.currentUser?.email!).asReadonly();
    this.createNewPost = signal(false);
  }

  ngOnInit(): void {
    this._postService.getOwnPosts(this._auth.currentUser?.email!);
    this._postService.getFriendsPosts(this._auth.currentUser?.email!);
  }

  alterCreateNewPost() {
    this.createNewPost.set(!this.createNewPost());
  }

  deletePost(postId: string) {
    try {
      this._postService.deletePost(postId);
    } catch (error: any) {
      console.error("Error while deleting post", error);
    }
  }

  get getCreateNewPost() {
    return this.createNewPost.asReadonly();
  }

  getFriendsPosts() {
    this._postService.getFriendsPosts(this._auth.currentUser?.email!);
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
