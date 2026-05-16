import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { Cookie } from './cookie';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  public http: HttpClient = inject(HttpClient);
  public cookieSrv: Cookie = inject(Cookie);
  private router: Router = inject(Router);

  private _url: string;

  constructor() {
    this._url = environment.endpoint + '/api';
  }

  public async login(username: string, password: string) {

    let response: any = '';
    try {
      const data = await firstValueFrom(this.http.post(this._url + '/login', {
        username: username,
        password: password
      }, { headers: { 'Content-Type': 'application/json' } }));

      console.log(data)
      response = data as LoginModel;
      const time = (Date.now() / 1000) + 3500;
      this.cookieSrv.add(response.data.token, time, response.data.userId);

      this.router.navigate(['/home']);
    } catch (e) {
      console.error(e)
    }

  }

  public async logout() {
    await this.cookieSrv.delete();
    this.router.navigate(['/login']);
  }
}
