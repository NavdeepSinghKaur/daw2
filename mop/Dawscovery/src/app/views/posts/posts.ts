import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts implements OnInit {

  private _postService: PostService = inject(PostService);

  constructor() {

  }

  ngOnInit(): void {
    this._postService.getPosts('1').then((post) => {
      console.log(post);
    });
  }

}
