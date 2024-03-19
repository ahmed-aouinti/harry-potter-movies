import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../common/movie';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from 'src/app/common/duration-format.pipe';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CustomCurrencyPipe } from '../../common/custom-currency.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  imports: [
    CommonModule,
    DurationFormatPipe,
    CustomCurrencyPipe,
    ReactiveFormsModule,
  ],
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  titleFilterControl = new FormControl('');
  releaseYearFilterControl = new FormControl(null);

  private movieService: MovieService = inject(MovieService);

  ngOnInit() {
    this.movies$ = combineLatest([
      this.movieService.getAllMovies(),
      this.titleFilterControl.valueChanges.pipe(startWith('')),
      this.releaseYearFilterControl.valueChanges.pipe(startWith(null)),
    ]).pipe(
      map(([movies, titleFilter, releaseYearFilter]) =>
        this.applyFilters(movies, titleFilter!, releaseYearFilter!)
      )
    );
  }

  applyFilters(
    movies: Movie[],
    titleFilter: string,
    releaseYearFilter: number | null
  ): Movie[] {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase())
    );

    if (
      releaseYearFilter !== null &&
      releaseYearFilter.toString().length >= 4
    ) {
      return filteredMovies.filter(
        (movie) =>
          new Date(movie.release_date).getFullYear() === releaseYearFilter
      );
    }

    return filteredMovies;
  }
}
