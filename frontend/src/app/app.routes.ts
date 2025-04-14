import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {SignInComponent} from '../pages/sign-in/sign-in.component';
import {MoviesComponent} from '../pages/movies/movies.component';
import {inject} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    canActivate:[
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(Router).createUrlTree(['/sign-in']);
    }
    ],
    component: MoviesComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  }
];
