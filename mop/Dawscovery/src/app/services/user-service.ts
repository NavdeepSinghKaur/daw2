import { inject, Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, collectionData, where, query, doc, arrayUnion, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { User } from '../models/user';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Connections } from '../views/connections/connections';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _firestore: Firestore = inject(Firestore);

  private _userCollection: CollectionReference<User> = collection(this._firestore, 'users') as CollectionReference<User>;

  constructor() {

  }

  getUser(username: string): Observable<User | string> {
    const q = query(this._userCollection, where('username', '==', username));
    return collectionData(q, { idField: 'username' }).pipe(
      map((user: any) => {
        return user[0] as User;
      }),
      catchError((error: any) => {
        return error as string;
      })
    );
  }

  async addConnection(from: string, to: string): Promise<void> {
    let ref = doc(this._firestore, 'users', to);
    try {
      console.log(from);
      await updateDoc(ref, { 'connectionFrom': arrayUnion(from) });
    } catch (error: any) {
      console.log(error);
    }

    let ref2 = doc(this._firestore, 'users', from);
    try {
      await updateDoc(ref2, { 'connectionTo': arrayUnion(to) });
    } catch (error: any) {
      console.log(error);
    }
  }

  async acceptConnection(from: string, to: string) {
    let ref = doc(this._firestore, 'users', to);
    try {
      await updateDoc(ref, { 'connectionFrom': arrayRemove(from) });
      await updateDoc(ref, { connections: arrayUnion(from) });
    } catch (error: any) {
      console.log(error);
    }

    let ref2 = doc(this._firestore, 'users', from);
    try {
      await updateDoc(ref2, { 'connectionTo': arrayRemove(to) });
      await updateDoc(ref2, { connections: arrayUnion(to) });
    } catch (error: any) {
      console.log(error);
    }
  }

  async rejectConnection(from: string, to: string) {
    let ref = doc(this._firestore, 'users', to);
    try {
      await updateDoc(ref, { 'connectionFrom': arrayRemove(from) });
    } catch (error: any) {
      console.log(error);
    }

    try {
      await updateDoc(ref, { 'connectionTo': arrayRemove(to) });
    } catch (error: any) {
      console.log(error);
    }
  }

  getConnections(userName: string): Observable<string[]> {
    let q = query(this._userCollection, where('username', '==', userName));
    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0]?.connections ?? [];
      }),
      catchError((error: any) => {
        return of([error]);
      })
    )
  }

  getPendingConnections(userName: string): Observable<string[]> {
    let q = query(this._userCollection, where('username', '==', userName));
    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0]?.connectionFrom ?? [];
      }),
      catchError((error: any) => {
        return of([error]);
      })
    )
  }

  getSentRequests(userName: string): Observable<string[]> {
    const q = query(this._userCollection, where('username', '==', userName));
    return collectionData(q, { idField: 'username' }).pipe(
      map((users: any) => {
        return users[0].connectionTo ?? [];
      }),
      catchError((error: any) => {
        return of([error]);
      })
    )
  }
}
