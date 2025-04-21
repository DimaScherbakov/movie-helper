import {Directive, HostListener} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Directive({
  standalone: true,
  selector: '[appGoogleSso]',
})
export class GoogleSsoDirective {
  // constructor(private authService: AuthService, private router: Router) {}
  // @HostListener("click")
  // async onClick() {
  //   try {
  //     await this.authService.googleLogin();
  //     this.router.navigateByUrl('/');
  //   } catch (error) {
  //     console.error('Google Sign-In error:', error);
  //   }
  // }
}
