import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (mod) => mod.MovieListComponent
      ),
  },
  {
    path: 'movies/:movieId',
    loadComponent: () =>
      import('./components/movie-details/movie-details.component').then(
        (mod) => mod.MovieDetailsComponent
      ),
  },
  { path: '**', redirectTo: 'movies', pathMatch: 'full' },
];
