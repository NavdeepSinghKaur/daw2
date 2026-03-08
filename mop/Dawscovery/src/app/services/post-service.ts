import { inject, Injectable } from '@angular/core';
import { Firestore, DocumentReference, CollectionReference, collection, addDoc, collectionData, arrayRemove, arrayUnion, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _firestore: Firestore = inject(Firestore);

  private _postCollection: CollectionReference<Post>;

  constructor() {
    this._postCollection = collection(this._firestore, 'posts') as CollectionReference<Post>;
  }

  public async createPost(post: Post): Promise<void> {
    try {
      let result: DocumentReference<Post> = await addDoc(this._postCollection, post) as DocumentReference<Post>;
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  // public async getPosts(id: string) {
  //   collectionData(this._postCollection, { idField: 'author' }).subscribe(
  //     (data: any) => { console.log(data); }
  //   );
  // }

  public getOwnPosts(author: string): Observable<Post[] | string> {
    const q = query(this._postCollection, where('author', '==', author));

    return collectionData(q, { idField: 'id' }).pipe(
      map((posts: any) => {
        console.log(posts);
        return posts as Post[];
      }), catchError(error => {
        console.log(error);
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
}
