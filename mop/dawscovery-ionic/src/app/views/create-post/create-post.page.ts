import { Component, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonTextarea, IonInput, IonIcon, IonRange, IonLabel, IonListHeader, IonThumbnail, IonImg, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonListHeader, IonLabel, IonRange, IonIcon, IonInput, IonTextarea, IonButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonThumbnail, IonImg, CommonModule, FormsModule]
})
export class CreatePostPage {
  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);
  public closeModal: OutputEmitterRef<boolean> = output<boolean>();
  public images: WritableSignal<string[]> = signal<string[]>([]);

  public address: WritableSignal<string> = signal<string>('');
  public description: WritableSignal<string> = signal<string>('');
  public aesthetics: WritableSignal<number> = signal<number>(0);
  public massification: WritableSignal<number> = signal<number>(0);
  public noise: WritableSignal<number> = signal<number>(0);
  public price: WritableSignal<number> = signal<number>(0);

  private _post: Post;

  constructor() {
    this.address = signal<string>('');
    this.description = signal<string>('');
    this.aesthetics = signal<number>(0);
    this.massification = signal<number>(0);
    this.noise = signal<number>(0);
    this.price = signal<number>(0);

    this._post = {
      address: '',
      author: '',
      createdAt: '',
      description: '',
      images: [''],
      rating: {
        aesthetics: 0,
        massification: 0,
        noise: 0,
        price: 0,
      },
      savedBy: [],
    };

  }

  public async createPost() {
    const user = this._auth.currentUser?.email;
    this._post.address = this.address();
    this._post.description = this.description();
    this._post.images = this.images();
    this._post.rating.aesthetics = this.aesthetics();
    this._post.rating.massification = this.massification();
    this._post.rating.noise = this.noise();
    this._post.rating.price = this.price();
    this._post.author = user!;

    try {
      await this._postService.createPost(this._post);
    } catch (errror: any) {
      console.error("An error has occured: ", errror);
    }

    this.cleanAllVariables();
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.update(current => [...current, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  private cleanAllVariables() {
    this.address.set('');
    this.description.set('');
    this.images.set([]);
    this.aesthetics.set(0);
    this.massification.set(0);
    this.noise.set(0);
    this.price.set(0);
  }
}
