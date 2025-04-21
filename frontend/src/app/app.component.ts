import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
