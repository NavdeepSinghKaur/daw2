import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonInput, IonInputPasswordToggle, IonCardTitle, IonButton, AlertController } from '@ionic/angular/standalone';
import { User } from 'src/app/models/user.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonInput, IonCardContent, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, RouterModule]
})
export class RegisterPage {
  private _authSrv: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  public username: WritableSignal<string>;
  public password: WritableSignal<string>;
  private errorAtRegister: WritableSignal<string>;
  private _user: User;

  constructor(private alertController: AlertController) {
    this._user = {
      connections: [],
      username: '',
      posts: [],
      connectionFrom: [],
      connectionTo: [],
      password: '',
      postLists: [],
    };
    this.username = signal<string>('');
    this.password = signal<string>('');
    this.errorAtRegister = signal<string>('');
  }

  public async register() {

    this._user.username = this.username();
    this._user.password = this.password();

    const validFields: boolean = this.validateFiels();

    if (validFields) {
      try {
        await this._authSrv.register(this.username(), this.password());
        
        const res = this._authSrv.loginResponse();
  
        if (res.success) { this._router.navigate(['/']); }

      } catch (error: any) {
  
        this.username.set('');
        this.password.set('');
  
        this.errorAtRegister.set("Error while generating the user, try again later");
      }
    }

  }

  private validateFiels(): boolean {
    let response: boolean = true;
    let errorMessage: string = '';

    if (this.username() == '' || this.password() == '') {
      errorMessage += `El username i password han de contenir un valor. \n`;

      response = false;
    }

    if (this.username().length < 2 || this.password().length < 8) {
      errorMessage += `\n El username ha de tenir mínim 2 caràcters i el password mínim 8`;

      response = false;
    }

    if (!response) {
      this.errorAtRegister.set(errorMessage);
      this.getError();
    }

    return response;
  }

  async getError() {
    const alert = await this.alertController.create({
      header: "S'ha produït un error",
      subHeader: "No s'ha pogut crear el teu compte",
      message: this.errorAtRegister(),
      buttons: ['Ok']
    })

    await alert.present()
  }
}
