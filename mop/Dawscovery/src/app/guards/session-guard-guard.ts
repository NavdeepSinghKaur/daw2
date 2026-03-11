import { CanActivateFn } from '@angular/router';

export const sessionGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
