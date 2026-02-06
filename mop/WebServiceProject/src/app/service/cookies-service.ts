import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {

  cookieSrv: CookieService = inject(CookieService);

  constructor() {}

  generateCookie(cookiName: string, data: any) {
    this.cookieSrv.set(cookiName, data, {sameSite: 'Lax', expires: (1/24), path: '/'});
  }

  getCookie() {
    
  }
}
