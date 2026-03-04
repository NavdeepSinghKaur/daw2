import { inject, Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, addDoc, getDoc, collectionData } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { DocumentReference } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { DocumentSnapshot } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _firestore: Firestore = inject(Firestore);

  private _postCollection: CollectionReference<Post>;

  constructor() {
    this._postCollection = collection(this._firestore, 'posts') as CollectionReference<Post>;
  }

  public async addPost(post: Post) {
    try {
      let result: DocumentReference<Post> = await addDoc(this._postCollection, post) as DocumentReference<Post>;
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  public async getPosts(author: string) {
    collectionData(this._postCollection, { idField: 'author' }).subscribe(
      (data: any) => { console.log(data); }
    );
    // try {
    //   const docRef = doc(this._firestore, 'posts', author) as DocumentReference<Post>;

    //   getDoc(docRef).then(
    //     (doc) => {
    //       console.log(doc.data());
    //       return doc.data();
    //     }
    //   ).catch(
    //     (error: any) => { console.log("error:", error) }
    //   ).finally(
    //     () => { console.log("completed") }
    //   );
    //   // const result: DocumentReference<Post> = await getDoc(doc);

    //   // let result = await ()

    // } catch (error: any) {
    //   console.log(error);
    // }
  }
}
