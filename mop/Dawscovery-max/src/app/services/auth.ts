import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private FirestoreSrv = inject(Firestore);
  private AuthSrv = inject(Auth);

  public async register(username: string, password: string): Promise<boolean> {
    return createUserWithEmailAndPassword(this.AuthSrv, username, password).then(
      (userCredential: UserCredential) => { return true; }
    ).catch(
      (error: any) => { console.log(error); return false; }
    );
  }

  public async login(username: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.AuthSrv, username, password).then(
      (userCredential: UserCredential) => { return true; }
    ).catch(
      (error: any) => { console.log(error); return false; }
    );
  }

  public async logout(): Promise<boolean> {
    return signOut(this.AuthSrv).then(
      () => { return true; }
    ).catch(
      (error: any) => { console.log(error); return false; }
    );
  }

  public isLogged(): boolean {
    return this.AuthSrv.currentUser !== null;
  }
}
