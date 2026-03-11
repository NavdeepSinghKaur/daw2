import { ChangeDetectionStrategy, Component, inject, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../../services/post-service';
import { Post } from '../../../models/post';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePost {
  private _postService: PostService = inject(PostService);
  private _auth: Auth = inject(Auth);
  public closeModal: OutputEmitterRef<boolean> = output<boolean>();
  private images: string[] = [];

  public address: WritableSignal<string> = signal<string>('');
  public description: WritableSignal<string> = signal<string>('');
  public aesthetics: WritableSignal<number> = signal<number>(0);
  public massification: WritableSignal<number> = signal<number>(0);
  public noise: WritableSignal<number> = signal<number>(0);
  public price: WritableSignal<number> = signal<number>(0);

  private _post: Post;

  constructor() {
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
    // this._post.images = this.images();
    this._post.images = ['']; //this.images;
    this._post.rating.aesthetics = this.aesthetics();
    this._post.rating.massification = this.massification();
    this._post.rating.noise = this.noise();
    this._post.rating.price = this.price();
    this._post.author = user!;
    //this._post.author = this._cookieService.getCookie('username')!;

    const res = await this._postService.createPost(this._post);
    console.log(res);
    this.cleanAllVariables();
  }

  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    let res = '';

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.images.push(reader.result as string);
      };

      reader.readAsDataURL(file)
    }
    // return res;
  }

  private cleanAllVariables() {
    this.address.set('');
    this.description.set('');
    this.images = [];
    // this.images.set('');
    this.aesthetics.set(0);
    this.massification.set(0);
    this.noise.set(0);
    this.price.set(0);
  }
}
