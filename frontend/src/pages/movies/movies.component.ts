import { Component } from '@angular/core';
import {MyMoviesTableComponent} from './my-movies-table/my-movies-table.component';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'mv-movies',
  imports: [MyMoviesTableComponent, MatChipsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  standalone: true,
})
export class MoviesComponent {

}
