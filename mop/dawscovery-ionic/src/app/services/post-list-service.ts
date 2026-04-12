import { inject, Injectable, Signal } from '@angular/core';
import { Firestore, CollectionReference, collection, addDoc, DocumentReference, collectionData, query, where, updateDoc, arrayUnion, doc } from '@angular/fire/firestore';
import { PostList } from '../models/post-list.model';
import { map, catchError, Observable, switchMap } from 'rxjs';
import { UserService } from './user-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PostListService {

  private _firestore: Firestore = inject(Firestore);
  private _postCollection: CollectionReference<PostList> = collection(this._firestore, 'postLists') as CollectionReference<PostList>;
  private _userService: UserService = inject(UserService);

  constructor() {

  }

  public async createPostList(postList: PostList) {
    try {
      let result: DocumentReference<PostList> = await addDoc(this._postCollection, postList) as DocumentReference<PostList>;
    } catch (error: any) {
      console.error(error);
    }
  }

  public getOwnPostLists(author: string): Signal<PostList[] | string | undefined> {
    const q = query(this._postCollection, where('author', '==', author));

    const posts: Observable<PostList[] | string> = collectionData(q, { idField: 'id' }).pipe(
      map((postLists: any) => {
        return postLists as PostList[];
      }), catchError(error => {
        return error as string;
      })
    );

    return toSignal(posts);
  }

  public showPostLists(author: string): Observable<string | PostList[]> {
    return this._userService.getConnections(author).pipe(
      switchMap((user: any) => {

        const parsedUser = user as string[];
        const q = query(this._postCollection, where('author', 'in', parsedUser));

        return collectionData(q).pipe(
          map(postLists => postLists as PostList[])
        )
      }),
      catchError((error: any) => error as string)
    )
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
