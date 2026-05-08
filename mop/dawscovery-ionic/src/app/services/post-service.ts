import { inject, Injectable, Injector, runInInjectionContext, Signal, WritableSignal } from '@angular/core';
import { Firestore, DocumentReference, CollectionReference, collection, addDoc, collectionData, arrayRemove, arrayUnion, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { collectionGroup, deleteDoc } from 'firebase/firestore';
import { UserService } from './user-service';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _firestore: Firestore = inject(Firestore);

  private _postCollection: CollectionReference<Post>;
  private _userService: UserService = inject(UserService);

  private _ownPosts: WritableSignal<Post[] | null>;
  private _friendsPosts: WritableSignal<Post[] | null>;
  private _savedPosts: WritableSignal<Post[] | null>;

  constructor() {
    this._ownPosts = signal(null);
    this._friendsPosts = signal(null);
    this._savedPosts = signal(null);
    this._postCollection = collection(this._firestore, 'posts') as CollectionReference<Post>;
  }

  public get ownPosts() { return this._ownPosts.asReadonly(); }
  public get friendsPosts() { return this._friendsPosts.asReadonly(); }
  public get savedPosts() { return this._savedPosts.asReadonly(); }

  public async createPost(post: Post): Promise<void> {
    try {
      await addDoc(this._postCollection, post);
    } catch (error: any) {
      console.error(error);
    }
  }

  public getOwnPosts(author: string) {
    const q = query(this._postCollection, where('author', '==', author));

    collectionData(q, { idField: 'id' }).pipe(
      map((posts: any) => {
        this._ownPosts.set(posts);
      }),
      catchError(error => {
        return of([error]);
      })
    ).subscribe();
  }

  public async savePost(postId: string, userName: string): Promise<void> {
    let ref = doc(this._firestore, 'posts', postId);
    await updateDoc(ref, { savedBy: arrayUnion(userName) });
  }

  public async unsavePost(postId: string, userName: string): Promise<void> {
    let ref = doc(this._firestore, 'posts', postId);
    await updateDoc(ref, { savedBy: arrayRemove(userName) });
  }

  public getSavedPosts(userName: string) {
    const q = query(this._postCollection, where('savedBy', 'array-contains', userName));

    return collectionData(q, { idField: 'id' }).pipe(
      map((posts: any) => {
        this._savedPosts.set(posts);
        return posts;
      }), catchError(error => {
        console.error("Error in getSavedPosts:", error);
        return of([]);
      })
    );
  }

  public async deletePost(postId: string) {
    try {
      let ref = doc(this._firestore, 'posts', postId);
      await deleteDoc(ref);

    } catch (error: any) {
      console.error("Error while deleting post: ", error)
    }
  }

  public getFriendsPosts(userName: string) {
    this._friendsPosts.set(null);

    this._userService.getConnections(userName).pipe(
      switchMap((users: string[]) => {
        if (users.length === 0) {
          return of([]);
        }
        const q = query(this._postCollection, where('author', 'in', users));

        return collectionData(q, { idField: 'id' });
      }),
      map((posts: any) => {
        this._friendsPosts.set(posts);
      }),
      catchError((error: any) => {
        console.error("Error in getFriendsPosts:", error);
        return of([]);
      })
    ).subscribe();
  }

  public async likePost(postId: string, username: string) {
    const ref = doc(this._firestore, 'posts', postId);

    await updateDoc(ref, { savedBy: arrayUnion(username) });
  }

  public async unlikePost(postId: string, username: string) {
    const ref = doc(this._firestore, 'posts', postId);

    await updateDoc(ref, { savedBy: arrayRemove(username) });
  }
}