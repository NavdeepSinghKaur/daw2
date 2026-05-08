import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, AlertController, IonToast } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { PostService } from 'src/app/services/post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterModule, IonCardTitle, IonAlert, IonToast]
})
export class PostsPage implements OnInit {

  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);
  private _alertController = inject(AlertController);

  private _showDelete: WritableSignal<boolean> = signal(false);
  public showDelete = computed(() => {this._showDelete.asReadonly()})

  public createNewPost: WritableSignal<boolean>;
  public friendsPosts = this._postService.friendsPosts;
  public username: Signal<string>;
  public posts = this._postService.ownPosts;
  public selectedPostId: WritableSignal<string>;
  

  constructor() {
    this.username = signal(this._auth.currentUser?.email!).asReadonly();
    this.createNewPost = signal(false);
    this.selectedPostId = signal('');
  }

  ngOnInit(): void {
    this._postService.getOwnPosts(this._auth.currentUser?.email!);
    this._postService.getFriendsPosts(this._auth.currentUser?.email!);
  }

  alterCreateNewPost() {
    this.createNewPost.set(!this.createNewPost());
  }

  setSelectedPostId(postId: string) {
    this.selectedPostId.set(postId);
  }

  async showDeleteAlert(postId: string) {
    const message = await this._alertController.create({
      header: 'Segur que vols eliminar el post?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si, eliminar post',
          cssClass: 'alert-button-confirm',
          handler: () => { this._deletePost(postId); }
        }
      ]
    });

    await message.present();
  }

  private _deletePost(postId: string) {
    try {
      this._postService.deletePost(postId);
      this._showDelete.set(true);
    } catch (error: any) {
      console.error("Error while deleting post", error);
    }
  }

  public setShowDelete() {
    this._showDelete.set(false);
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
