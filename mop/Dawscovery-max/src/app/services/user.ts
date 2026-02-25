import { inject, Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, docData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Returns a live stream of the current user's document
  // docData() is like collectionData() but for a single document
  getCurrentUser(): Observable<User> {
    const uid = this.auth.currentUser!.uid;
    const userDoc = doc(this.firestore, 'users', uid);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  // Searches Firestore for a user with a matching username field
  async findUserByUsername(username: string): Promise<User | null> {
    const usersRef = collection(this.firestore, 'users');
    // query() + where() = "SELECT * FROM users WHERE username = ?"
    const q = query(usersRef, where('username', '==', username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    // snapshot.docs[0] is the first result
    // .data() gives you the fields, spread + id gives you the full object
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as User;
  }

  async sendFriendRequest(targetUserId: string): Promise<boolean> {
    const currentUid = this.auth.currentUser?.uid;
    if (!currentUid) return false;

    try {
      // Update both documents atomically — arrayUnion prevents duplicates
      await updateDoc(doc(this.firestore, 'users', currentUid), {
        sentRequests: arrayUnion(targetUserId)
      });
      await updateDoc(doc(this.firestore, 'users', targetUserId), {
        receivedRequests: arrayUnion(currentUid)
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async acceptFriendRequest(requesterId: string): Promise<boolean> {
    const currentUid = this.auth.currentUser?.uid;
    if (!currentUid) return false;

    try {
      // Add each other as friends AND remove the pending requests
      await updateDoc(doc(this.firestore, 'users', currentUid), {
        friends: arrayUnion(requesterId),
        receivedRequests: arrayRemove(requesterId)  // clean up the request
      });
      await updateDoc(doc(this.firestore, 'users', requesterId), {
        friends: arrayUnion(currentUid),
        sentRequests: arrayRemove(currentUid)       // clean up the request
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async declineFriendRequest(requesterId: string): Promise<boolean> {
    const currentUid = this.auth.currentUser?.uid;
    if (!currentUid) return false;

    try {
      // Just remove the requests, don't add as friends
      await updateDoc(doc(this.firestore, 'users', currentUid), {
        receivedRequests: arrayRemove(requesterId)
      });
      await updateDoc(doc(this.firestore, 'users', requesterId), {
        sentRequests: arrayRemove(currentUid)
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // Fetches full User objects from an array of IDs
  // Used to display friend names instead of just IDs
  async getUsersByIds(ids: string[]): Promise<User[]> {
    if (ids.length === 0) return [];
    const usersRef = collection(this.firestore, 'users');
    // 'in' operator = "WHERE id IN (id1, id2, id3...)"
    // Firestore limits this to 30 items max
    const q = query(usersRef, where('__name__', 'in', ids));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as User);
  }
}