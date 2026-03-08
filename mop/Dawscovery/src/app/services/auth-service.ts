import { inject, Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _firestore: Firestore = inject(Firestore);
  private _userCollection: CollectionReference;
  private _auth: Auth = inject(Auth);
  constructor() {
    this._userCollection = collection(this._firestore, 'users') as CollectionReference<User>;
  }

  public async login(user: User) {
    try {
      let result: UserCredential = await signInWithEmailAndPassword(this._auth, user.username, user.password)
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  public async register(userName: string, password: string): Promise<boolean> {
    try {
      let result: UserCredential = await createUserWithEmailAndPassword(this._auth, userName, password)
      let ref = doc(this._firestore, 'users', userName);
      await setDoc(ref, {
        connections: [],
        username: userName,
        posts: [],
        connectionFrom: [],
        connectionTo: [],
        password: password,
        postLists: [],
      });
      console.log(result)
      return true;
    } catch (error: any) {
      console.log(error)
      return false;
    }
  }

  public async logout() {
    try {
      let result: void = await signOut(this._auth);
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }
}
