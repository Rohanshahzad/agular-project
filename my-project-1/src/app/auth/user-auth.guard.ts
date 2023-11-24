import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// const router = new Router()
export const userAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('user-data');
  const router: any = inject(Router)
  if (token) {
    return true;
  } else {
    router.navigate(['/login'])
    return false
  }
};