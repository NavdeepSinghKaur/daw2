import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';
import { CreatePost } from './create-post/create-post';
import { Auth } from '@angular/fire/auth';

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

  constructor() {
    let username = this._auth.currentUser?.email!;
    console.log(username)
    this._postService.getOwnPosts(username).subscribe(res => { console.log(res) });
  }

  ngOnInit(): void {
    // this._postService.getPosts('1').then((post) => {
    //   console.log(post);
    // });
  }



}
