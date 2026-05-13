import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {
  private _router: Router = inject(Router)
  private _authSrv: AuthService = inject(AuthService);
  private _auth: Auth = inject(Auth);

  constructor() { }

  ngOnInit() {
  }


  login() {
    this._router.navigate(['/login']);
  }

  register() {
    this._router.navigate(['/register']);
  }

  public async loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this._auth, provider);
      
      await this._authSrv.generateUserTemplate(result.user.email!)
      console.log(this._authSrv.loginResponse())
      this._router.navigate(['/home'])
    } catch (error) {
      console.error(error);
    }
  }
}
