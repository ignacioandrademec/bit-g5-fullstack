import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state):boolean| UrlTree => {

  const router = inject(Router);

  if(typeof window === 'undefined'){
    return true;
  }
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
