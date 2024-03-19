import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/common/custom-currency.pipe';
import { DurationFormatPipe } from 'src/app/common/duration-format.pipe';
import { Movie } from 'src/app/common/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe, DurationFormatPipe, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  @Input() movieId!: string;

  movie$!: Observable<Movie>;

  private movieService: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movie$ = this.movieService.getMovie(this.movieId);
  }
}
