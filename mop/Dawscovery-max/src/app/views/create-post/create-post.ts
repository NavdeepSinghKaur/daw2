import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePost {
  title = '';
  address = '';
  images = '';
  noise = 3;
  massification = 3;
  price = 3;
  aesthetics = 3;
  error = signal<string | null>(null);

  private postService = inject(PostService);

  onSubmit() {
    this.postService.createPost(this.title, this.address, this.images, this.noise, this.massification, this.price, this.aesthetics);
  }
}