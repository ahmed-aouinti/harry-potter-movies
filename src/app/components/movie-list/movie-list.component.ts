import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../common/movie';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from 'src/app/common/duration-format.pipe';
import { Observable } from 'rxjs';
import { CustomCurrencyPipe } from '../../common/custom-currency.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  imports: [CommonModule, DurationFormatPipe, CustomCurrencyPipe],
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  private movieService: MovieService = inject(MovieService);

  ngOnInit() {
    this.movies$ = this.movieService.getAllMovies();
  }
}
