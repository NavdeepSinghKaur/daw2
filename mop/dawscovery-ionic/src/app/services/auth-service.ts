import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _firestore: Firestore = inject(Firestore);
  private _auth: Auth = inject(Auth);

  private _loginResponse: WritableSignal<any> = signal('')
  public loginResponse: Signal<any> = computed(() => { this._loginResponse.asReadonly() })

  constructor() {
  }

  public async login(user: User) {
    try {
      await signInWithEmailAndPassword(this._auth, user.username, user.password)
    } catch (error: any) {
      console.error(error);
    }
  }

  public async register(userName: string, password: string) {
    const user = {
      username: userName,
      password: password,
      connections: [],
      posts: [],
      connectionFrom: [],
      connectionTo: [],
      postLists: [],
    }

    try {
      await createUserWithEmailAndPassword(this._auth, userName, password)

      let ref = doc(this._firestore, 'users', userName);
      await setDoc(ref, user);

      this._loginResponse.set({'success': true, 'errorMessage': false})

    } catch (error: any) {
      console.error(error)
      this._loginResponse.set({'success': false, 'errorMessage': error})

    }
  }

  public async logout() {
    try {
      await signOut(this._auth);
    } catch (error: any) {
      console.error(error);
    }
  }
}
