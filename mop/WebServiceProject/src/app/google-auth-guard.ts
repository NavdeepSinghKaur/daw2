import { CanActivateFn, Router } from '@angular/router';
import { GoogleAuth } from './service/google/google-auth';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';


export const googleAuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const cokoieSrv = inject(CookieService);
  const googleAuthSrv = inject(GoogleAuth);

  // const cookie = cokoieSrv.check('gT');
  const isLoggedIn = await googleAuthSrv.checkIfTokenExists();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    router.parseUrl('/vin');
    return true;
  }
  
  return false;
};
