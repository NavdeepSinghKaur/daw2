import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, arrayUnion, arrayRemove, query, where, docData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { PostList } from '../models/postList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Get all lists owned by the current user
  getMyLists(): Observable<PostList[]> {
    const uid = this.auth.currentUser!.uid;
    const listsRef = collection(this.firestore, 'lists');
    // Only fetch lists where owner matches current user
    const q = query(listsRef, where('owner', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<PostList[]>;
  }

  // Get a single list by its Firestore document ID
  getListById(listId: string): Observable<PostList> {
    const listDoc = doc(this.firestore, 'lists', listId);
    return docData(listDoc, { idField: 'id' }) as Observable<PostList>;
  }

  async createList(name: string): Promise<boolean> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return false;

    try {
      const newList: Omit<PostList, 'id'> = {
        name,
        owner: uid,
        posts: [],
        sharedWith: [],
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(this.firestore, 'lists'), newList);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async addPostToList(listId: string, postId: string): Promise<boolean> {
    try {
      await updateDoc(doc(this.firestore, 'lists', listId), {
        posts: arrayUnion(postId)   // arrayUnion prevents adding duplicates
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async removePostFromList(listId: string, postId: string): Promise<boolean> {
    try {
      await updateDoc(doc(this.firestore, 'lists', listId), {
        posts: arrayRemove(postId)
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async shareListWithFriend(listId: string, friendId: string): Promise<boolean> {
    try {
      await updateDoc(doc(this.firestore, 'lists', listId), {
        sharedWith: arrayUnion(friendId)
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // Get lists that friends have shared with the current user
  getSharedWithMe(): Observable<PostList[]> {
    const uid = this.auth.currentUser!.uid;
    const listsRef = collection(this.firestore, 'lists');
    // 'array-contains' = "WHERE sharedWith CONTAINS uid"
    const q = query(listsRef, where('sharedWith', 'array-contains', uid));
    return collectionData(q, { idField: 'id' }) as Observable<PostList[]>;
  }
}