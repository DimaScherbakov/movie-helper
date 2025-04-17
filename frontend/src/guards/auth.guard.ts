import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

export default function authGuard (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    switchMap(user => user ? fromPromise(user.getIdToken()) : of(null)),
    map(token => !!token || router.createUrlTree(['/sign-in'])))
}
