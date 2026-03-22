import { inject, Injectable } from '@angular/core';
import { Firestore, DocumentReference, CollectionReference, collection, addDoc, collectionData, arrayRemove, arrayUnion, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { catchError, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { deleteDoc } from 'firebase/firestore';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _firestore: Firestore = inject(Firestore);

  private _postCollection: CollectionReference<Post>;
  private _userService: UserService = inject(UserService);

  constructor() {
    this._postCollection = collection(this._firestore, 'posts') as CollectionReference<Post>;
  }

  public async createPost(post: Post): Promise<void> {
    try {
      let result: DocumentReference<Post> = await addDoc(this._postCollection, post) as DocumentReference<Post>;
    } catch (error: any) {
      console.error(error);
    }
  }

  public getOwnPosts(author: string): Observable<Post[] | string> {
    const q = query(this._postCollection, where('author', '==', author));

    return collectionData(q, { idField: 'id' }).pipe(
      map((posts: any) => {
        return posts as Post[];
      }), catchError(error => {
        return error as string;
      })
    );
  }

  public async savePost(postId: string, userName: string): Promise<void> {
    let ref = doc(this._firestore, 'posts', postId);

    await updateDoc(ref, { savedBy: arrayUnion(userName) });
  }

  public async unsavePost(postId: string, userName: string): Promise<void> {
    let ref = doc(this._firestore, 'posts', postId);

    await updateDoc(ref, { savedBy: arrayRemove(userName) });
  }

  public getSavedPosts(userName: string): Observable<Post[] | string> {
    const q = query(this._postCollection, where('savedBy', 'array-contains', userName));

    return collectionData(q, { idField: 'id' }).pipe(
      map((posts: any) => {
        return posts as Post[];
      }), catchError(error => {
        return error as string;
      })
    );
  }

  // for later, modify this function, so only the author can delete posts
  public async deletePost(postId: string, author: string) {
    let ref = doc(this._firestore, 'posts', postId);

    await deleteDoc(ref);
  }

  public getFriendsPosts(userName: string): Observable<Post[] | string> {
    return this._userService.getConnections(userName).pipe(
      switchMap((users: string[]) => {
        console.log(users);
        const q = query(this._postCollection, where('author', 'in', users));

        return collectionData(q, { idField: 'id' }).pipe(
          map((posts: any) => {

            return posts as Post[]
          })
        );
      }),
      catchError((error: any) => {
        return error as string;
      })
    )
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