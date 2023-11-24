import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginguardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('user-data');
  const router: any = inject(Router)
  if(token){
    router.navigate(['/home'])
    return false;
  }else{
    return true
  }

};
