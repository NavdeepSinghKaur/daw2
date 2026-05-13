import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _firestore: Firestore = inject(Firestore);
  private _auth: Auth = inject(Auth);
  private _userCollection: CollectionReference<User> = collection(this._firestore, 'users') as CollectionReference<User>;


  private _loginResponse: WritableSignal<any> = signal('')
  public loginResponse: Signal<any> = computed(() => this._loginResponse.asReadonly() )

  private _googleLoginResponse: WritableSignal<any> = signal('')
  public googleLoginResponse: Signal<any> = computed(() => this._googleLoginResponse.asReadonly() )
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

  public async generateUserTemplate(username: string) {
    let q = query(this._userCollection, where('username', '==', username));
    let userExists: boolean = false;

    await firstValueFrom(
      collectionData(q, { idField: 'username' }).pipe(
        map((users: any) => {
          if (users[0]) {
            userExists = true;
          }
        })
      )
    );
    
    if (!userExists) {
      const user = {
        username: username,
        password: '',
        connections: [],
        posts: [],
        connectionFrom: [],
        connectionTo: [],
        postLists: [],
      }
  
      let ref = doc(this._firestore, 'users', username);
      await setDoc(ref, user);
    }

    this._loginResponse.set({'success': true, 'errorMessage': false})
  }
}
