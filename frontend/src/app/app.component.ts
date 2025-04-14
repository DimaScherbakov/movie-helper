import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  private authService: AuthService;
  constructor( private router: Router) {
    this.authService = inject(AuthService);
    this.router = inject(Router);
  }

  async loginWithGoogle() {
    try {
      await this.authService.googleLogin();

    } catch (error) {
      this.router.navigateByUrl('/');
      console.error('Google Sign-In error:', error);
    }
  }
}
