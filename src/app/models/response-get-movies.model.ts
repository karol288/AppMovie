import { Pelicula } from './peliculas.models';

export interface ResponseGetMovies {
  page: number;
  results: Pelicula[];
  total_pages: number;
  total_results: number;
}
