import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from './models/peliculas.models';


@Pipe({
  name: 'filtroGenero'
})
export class FiltroGeneroPipe implements PipeTransform {

  transform(Peliculas: Pelicula[], generoId: number ): Pelicula[] {
    if (!generoId) { //si el generoId no existe o no esta seleccionado
      return Peliculas; //va a mostrar todas las peliculasx
    }

    // Filtramos las películas por género
    return Peliculas.filter(pelicula => pelicula.genre_ids.includes(generoId));

  }

}
