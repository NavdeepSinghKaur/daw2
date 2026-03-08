import { inject, Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, addDoc, DocumentReference, collectionData, query, where, updateDoc, arrayUnion, doc } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { PostList } from '../models/post-list';
import { map, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostListService {

  private _firestore: Firestore = inject(Firestore);

  private _postCollection: CollectionReference<PostList> = collection(this._firestore, 'postLists') as CollectionReference<PostList>;

  constructor() {

  }

  public async createPostList(postList: PostList) {
    try {
      let result: DocumentReference<PostList> = await addDoc(this._postCollection, postList) as DocumentReference<PostList>;
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  public getOwnPostLists(author: string) {
    const q = query(this._postCollection, where('author', '==', author));

    return collectionData(q, { idField: 'id' }).pipe(
      map((postLists: any) => {
        return postLists as PostList[];
      }), catchError(error => {
        return error as string;
      })
    );
  }

  public showPostLists(author: string) {
    const q = query(this._postCollection, where('author', '==', author));

    return collectionData(q, { idField: 'id' }).pipe(
      map((postLists: any) => {
        return postLists as PostList[];
      }), catchError(error => {
        return error as string;
      })
    );
  }

  public async sharePostList(postListId: string, userName: string) {
    let ref = doc(this._firestore, 'postLists', postListId);
    await updateDoc(ref, { shared: arrayUnion(userName) });
  }

  public getSharedPostLists(userName: string): Observable<PostList[] | string> {
    const q = query(this._postCollection, where('shared', 'array-contains', userName));

    return collectionData(q, { idField: 'id' }).pipe(
      map((postLists: any) => {
        return postLists as PostList[]
      }),
      catchError((error: any) => {
        return error as string;
      })
    )
  }
}
