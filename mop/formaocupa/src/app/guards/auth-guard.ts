import { CanActivateFn } from '@angular/router';
import { Cookie } from '../services/cookie';
import { inject } from '@angular/core';
import { CookieModel } from '../models/cookie-model';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {

  const cookieSrv: Cookie = inject(Cookie);
  const router: Router = inject(Router);

  const cookieData: CookieModel | null = await cookieSrv.getCookie();

  if (cookieData !== null) {
    const cookieTime: number = Number(cookieData.time);

    if ((Date.now() / 1000) < cookieTime) {
      return true;
    }

    await cookieSrv.delete();
  }

  router.navigate(['/login']);
  return false;
};
