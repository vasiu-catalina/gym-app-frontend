import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../states/auth.state';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authState = inject(AuthState);
  const router = inject(Router);
  if (!authState.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
