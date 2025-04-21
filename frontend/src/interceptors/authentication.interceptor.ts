import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    switchMap(user => user ? fromPromise(user.getIdToken()) : of(null)),
    switchMap((token) => {
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
    return next(req);
  }))
};
