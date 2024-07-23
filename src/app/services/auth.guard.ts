import { CanActivateFn } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getUserRole().pipe(
    map((user: JwtPayload | null) => {
      if (user !== null) {
        return true;
      } else {
        authService.router.navigate(['/login']);
        return false;
      }
    })
  );
};