import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuth {
  http: HttpClient = inject(HttpClient);
  cookieSrv: CookieService = inject(CookieService);
  
  private async login(): Promise<string> {
    const client_id = '';
    const scope = "https://www.googleapis.com/auth/userinfo.profile";
    const url = ``;

    window.open(url, 'google Auth', 'width=500,height=600');

    return new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
  
        if (e.origin !== 'http://localhost:8000') return reject('El servidor back-end no està operant al port 8000');
  
        if (e.data.type === 'google_token') {
          const token = e.data.token;
          this.cookieSrv.set('gT', token, {sameSite: 'Lax', expires: (1/24), path: '/'});
          return resolve("");
        }
      });
    })
  }

  async getUserData() {
    const url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

    return this.http.get(url, {
      headers: {'Authorization': `Bearer ${this.getToken}`},
    }
  )}

  async checkIfTokenExists(): Promise<number> {
      if(!this.cookieSrv.check('gT')) {
        try {
          await this.login();
        } catch(e) {
          console.error(e);
          return 0;
        }
      }

    return 1;
  }

  private get getToken() {
    return this.cookieSrv.get('gT');
  }
}
