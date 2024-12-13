import { Component, inject, OnInit } from '@angular/core';
import { Pelicula } from '../models/peliculas.models';
import { MoviesService } from '../providers/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-detalle-peliculas',
  imports: [],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css'
})
export class DetallePeliculasComponent implements OnInit{

  pelicula?:Pelicula; //va a estar tipada para que siga la estructura de la interface de pelicula

  environments = environment //para usar las url de las imagenes

  private readonly moviesService = inject(MoviesService);//se inyecta el servicio para luego usar el getmoviebyId
  private readonly route = inject(ActivatedRoute); //inyectamos para ruta para poder conseguir el id

  ngOnInit(): void {
    // Suscribimos a los cambios de parámetros de la ruta
    this.route.paramMap.subscribe(params => { //paramMpa va a tener lo que este en la URL, es como estar pendiente de si hay algo nuevo en la caja.
      const movieId = params.get('peliculaId'); // Obtenemos el id del parámetro, el param.get es para decir que de todo lo que esta en la URL me cosiga lo que este en el lugar que yo llame peliculaId

      if (movieId) { //si tenemos movieId
        // Llamamos al servicio para obtener la película por id
        this.moviesService.getMovieById(movieId).subscribe({ // aca le pasamos el id, y le decimos a suscribe
          next: (movie) => { //lo que va a recibir el subscribe lo voy a guardar en movie
            console.log(movie);

            const pelicula = movie as Pelicula;  //aca creo una constante que va a ser pelicula y a esta le voy a pasar lo que recibi en movie y le voy a decir que se comporte como la interface de pelicula

            this.pelicula = pelicula; //asignamos la película obtenida
          },
          error: (error) => {
            console.error( error); //mostramos el error
          }
        });
      }
    });
  }
}
