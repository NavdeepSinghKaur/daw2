import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth)
  const router = inject(Router)

  return authState(auth).pipe(
    map(user => {
      if (user) {
        return true;
      }
      return router.parseUrl('/login');
    })
  )
};

export const loggedGuard: CanActivateFn = () => {
    const auth = inject(Auth)

    return authState(auth).pipe(
      map(user => {
        if (user) {
          return false;
        }
        return true;
      })
    )
}