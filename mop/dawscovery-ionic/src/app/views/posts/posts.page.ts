import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, AlertController, IonToast } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { PostService } from 'src/app/services/post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterModule, IonCardTitle, IonToast]
})
export class PostsPage implements OnInit {

  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);
  private _alertController = inject(AlertController);

  private _showToastMessage: WritableSignal<boolean>;


  public friendsPosts = this._postService.friendsPosts;
  public username: Signal<string>;
  public posts = this._postService.ownPosts;
  public toastMessage: WritableSignal<string>;
  

  constructor() {
    this._showToastMessage = signal(false);
    this.username = signal(this._auth.currentUser?.email!).asReadonly();
    this.toastMessage = signal('');
  }

  ngOnInit(): void {
    this._postService.getOwnPosts(this._auth.currentUser?.email!);
    this._postService.getFriendsPosts(this._auth.currentUser?.email!);
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

  private async _deletePost(postId: string) {
    try {
      await this._postService.deletePost(postId);
      this.toastMessage.set("S'ha eliminat el post");
    } catch (error: any) {
      console.error("Error while deleting post", error);
      this.toastMessage.set("No s'ha pogut eliminar el post. Torna a intentar-ho després.");
    }
    this._showToastMessage.set(true);
  }

  public setShowToastMessage() {
    this._showToastMessage.set(false);
  }

  get getShowToastMessage() {
    return this._showToastMessage.asReadonly();
  }

  get getToastMessage() {
    return this.toastMessage.asReadonly();
  }

  getFriendsPosts() {
    this._postService.getFriendsPosts(this._auth.currentUser?.email!);
  }

  async likePost(postId: string) {
    try {
      await this._postService.likePost(postId, this._auth.currentUser?.email!);
      this.toastMessage.set("S'ha agregat a favorits")
    } catch (error: any) {
      console.error(error)
      this.toastMessage.set("S'ha produït un error.");
    }
    this._showToastMessage.set(true);
  }

  async unlikePost(postId: string) {
    try {
      await this._postService.unlikePost(postId, this._auth.currentUser?.email!);
      this.toastMessage.set("S'ha eliminat de favorits.");
    } catch (error: any) {
      console.error(error)
      this.toastMessage.set("S'ha produït un error.");
    }
    this._showToastMessage.set(true);
  }
}
