import { inject, Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, collectionData, where, query, doc, arrayUnion, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _firestore: Firestore = inject(Firestore);

  private _userCollection: CollectionReference<User> = collection(this._firestore, 'users') as CollectionReference<User>;

  constructor() {

  }

  async getUser(username: string): Promise<User> {
    const q = query(this._userCollection, where('username', '==', username));

    const res = await firstValueFrom(
      collectionData(q, { idField: 'username' }).pipe(
        map((users: any) => users[0] as User)
      )
    );

    return res
  }

  async addConnection(from: string, to: string): Promise<void> {
    let ref = doc(this._firestore, 'users', to);
    try {
      await updateDoc(ref, { 'connectionFrom': arrayUnion(from) });
    } catch (error: any) {
      console.error(error);
    }

    let ref2 = doc(this._firestore, 'users', from);
    try {
      await updateDoc(ref2, { 'connectionTo': arrayUnion(to) });
    } catch (error: any) {
      console.error(error);
    }
  }

  async acceptConnection(from: string, to: string) {
    let ref = doc(this._firestore, 'users', to);
    try {
      await updateDoc(ref, { 'connectionFrom': arrayRemove(from) });
      await updateDoc(ref, { connections: arrayUnion(from) });
    } catch (error: any) {
      console.error(error);
    }

    let ref2 = doc(this._firestore, 'users', from);
    try {
      await updateDoc(ref2, { 'connectionTo': arrayRemove(to) });
      await updateDoc(ref2, { connections: arrayUnion(to) });
    } catch (error: any) {
      console.error(error);
    }
  }

  async rejectConnection(from: string, to: string) {
    let ref = doc(this._firestore, 'users', to);

    try {
      await updateDoc(ref, { 'connectionTo': arrayRemove(to) });
    } catch (error: any) {
      console.error(error);
    }

    try {
      console.log(from)
      await updateDoc(ref, { 'connectionFrom': arrayRemove(from) });
    } catch (error: any) {
      console.error(error);
    }
  }

  getConnections(userName: string): Observable<string[]> {
    let q = query(this._userCollection, where('username', '==', userName));

    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0]?.connections ?? [];
      }),
      catchError((error: any) => {
        console.error("Error in getConnections:", error);
        return of([]);
      })
    );
  }

  getPendingConnections(userName: string): Observable<string[]> {
    let q = query(this._userCollection, where('username', '==', userName));

    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0]?.connectionFrom ?? [];
      }),
      catchError((error: any) => {
        console.error("Error in getPendingConnections:", error);
        return of([]);
      })
    );
  }

  getSentRequests(userName: string): Observable<string[]> {
    const q = query(this._userCollection, where('username', '==', userName));
    
    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0].connectionTo ?? [];
      }),
      catchError((error: any) => {
        console.error("Error in getSentRequests:", error);
        return of([]);
      })
    );
  }
}
