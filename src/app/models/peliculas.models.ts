//esta interface me va a decir como va a ser la estructura de las peliculas
export interface Pelicula {
  adult: boolean;
  backdrop_path: string; //recibe una propiedad, y el tipado de esta
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
