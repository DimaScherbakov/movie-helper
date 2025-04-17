import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {SignInComponent} from '../pages/sign-in/sign-in.component';
import {MoviesComponent} from '../pages/movies/movies.component';
import authGuard from '../guards/auth.guard';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

export const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    component: MoviesComponent
  },
  {
    path: 'sign-in',
    canActivate:[() => {
      const authService = inject(AuthService);
      const router = inject(Router);
      return authService.user$.pipe(
        switchMap(user => user ? fromPromise(user.getIdToken()) : of(null)),
        map(token => !token || router.createUrlTree(['/'])))
    }],
    component: SignInComponent
  }
];
