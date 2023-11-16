import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userString  = localStorage.getItem('user');
  const router = inject(Router);

  if (userString) {
    const user = JSON.parse(userString);
    const pantallasArray = JSON.parse(user.pantallas);

    const currentUrl = state?.url || '/'; 

    const isAuthorized = pantallasArray.some((pantalla: any) => currentUrl.startsWith(pantalla.pant_URL));

    if(isAuthorized || currentUrl === '/Inicio'){
      return true;
    } else {
      return router.navigate(['/']);
    }
  } else {
    return router.navigate(['/Iniciar Sesion']);
  }
};