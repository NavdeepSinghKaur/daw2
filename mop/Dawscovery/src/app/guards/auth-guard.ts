import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs';
import { authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);

  return authState(auth).pipe(
    map(user => {
      if (user) {
        return true;
      }

      return false;
    })
  );
};