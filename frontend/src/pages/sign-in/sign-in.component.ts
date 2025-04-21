import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private authService: AuthService;
  constructor( private router: Router) {
    this.authService = inject(AuthService);
    this.router = inject(Router);
  }

  async loginWithGoogle() {
    try {
      await this.authService.googleLogin();
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }
}
