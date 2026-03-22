import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { PostList } from '../../models/post-list';
import { PostListService } from '../../services/post-list-service';
import { PostService } from '../../services/post-service';
import { UserService } from '../../services/user-service';
import { Auth, User } from '@angular/fire/auth';
import { map } from 'rxjs';
import { RouterOutlet } from "@angular/router";
import { Posts } from '../posts/posts';

@Component({
  selector: 'app-lists',
  imports: [RouterOutlet],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists {
  private _postListService: PostListService = inject(PostListService);
  private _postService: PostService = inject(PostService);
  private _userSercvice: UserService = inject(UserService);
  private _auth: Auth = inject(Auth);

  private allPosts: WritableSignal<Posts[] | null>;

  public friendsPostLists: Signal<PostList[] | null>;
  public ownPostLists: Signal<PostList[] | null>

  constructor() {
    this.friendsPostLists = signal(null);
    this.ownPostLists = signal(null);
    this.allPosts = signal(null);
  }

  ngOnInit(): void {
    this._postListService.showPostLists(this._auth.currentUser?.email!).subscribe({
      next: (res: any) => {
        const postLists = res as PostList[];
        this.friendsPostLists = signal(postLists);
      }, error: (error: any) => {
        console.error(error);
      }
    });

    this._postListService.getOwnPostLists(this._auth.currentUser?.email!).subscribe({
      next: (res: any) => {
        const postList = res as PostList[];
        this.ownPostLists = signal(postList);
  
      }, error: (error: any) => {
        console.error("An error has occured while fetching posts: ", error);
      }
    })
  }


  createPostList() {

  }


  showPosts() {

    this._postService.getFriendsPosts(this._auth.currentUser?.email!).subscribe({
      next: (res: any) => {

      },
      error: (error: any) => {

      }
    })
  }
}
