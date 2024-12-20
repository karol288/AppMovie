import { Component, inject, OnInit } from '@angular/core';
import { Pelicula } from '../models/peliculas.models';
import { MoviesService } from '../providers/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Cast, Creditos } from '../models/creditos.models';
import { CommonModule } from '@angular/common';
import { PeliculaDetalle } from '../models/peliculaDetalle.models';

@Component({
  selector: 'app-detalle-peliculas',
  imports: [CommonModule],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css'
})
export class DetallePeliculasComponent implements OnInit{

  pelicula?:PeliculaDetalle; //va a estar tipada para que siga la estructura de la interface de peliculaDetalle
  creditos?: Creditos; // Créditos de la película
  actores: Cast[] = []; // Lista de actores
  equipo: Cast[] = []; // Lista de equipo técnico

  environments = environment //para usar las url de las imagenes

  private readonly moviesService = inject(MoviesService);//se inyecta el servicio para luego usar el getmoviebyId
  private readonly route = inject(ActivatedRoute); //inyectamos para ruta para poder conseguir el id

  ngOnInit(): void {
    // Suscribimos a los cambios de parámetros de la ruta
    this.route.paramMap.subscribe(params => { //paramMpa va a tener lo que este en la URL, es como estar pendiente de si hay algo nuevo en la caja.
      const movieId = params.get('peliculaId'); // Obtenemos el id del parámetro, el param.get es para decir que de todo lo que esta en la URL me cosiga lo que este en el lugar que yo llame peliculaId

      if (movieId) { //si tenemos movieId
        // Llamamos a la funcion para ver los detalles de las peliculas
        this.getMovieDetails(movieId)

        // llamamos a la funcion para ver los creditos o el reparto de las peliculas
        this.getMovieCredits(movieId)
      }
    });
  }

  //funcion para ver los detalles de las peliculas
  private getMovieDetails(movieId: string): void{

    this.moviesService.getMovieById(movieId).subscribe({ // aca le pasamos el id, y le decimos a suscribe
      next: (movie) => { //lo que va a recibir el subscribe lo voy a guardar en movie
        console.log(movie);

        const pelicula = movie as PeliculaDetalle;  //aca creo una constante que va a ser pelicula y a esta le voy a pasar lo que recibi en movie y le voy a decir que se comporte como la interface de pelicula

        this.pelicula = pelicula; //asignamos la película obtenida
      },
      error: (error) => {
        console.error( 'Error obteniendo detalles:', error); //mostramos el error
      }

    });
  }

  //funcion para el reparto
  private getMovieCredits(movieId: string): void { //el void es para que no haga nada que simplemente haga algo con los datos

  this.moviesService.getCreditsMovie(movieId).subscribe({ //aca le vamos a pasar movieId y le vamos a decir suscribete para esperar una respuesta
    next: (credits) => {//aca va a recibir los creditos es decir la respuesta

      const creditos = credits as Creditos; // aca le vamos a decir la respuesta que recibiste por favor que te comportes como la interface credito

      this.creditos = creditos //aca le vamos a para a la propiedad de creditos la respuesta pues de los creditos

      this.actores =creditos.cast //entonces ya le digo de la respuesta de creditos sacame la de los cast que son los actores
      this.equipo = creditos.crew //aca le decimos pasale a la propiedad equipo los equipos que tiene la respuesta a la que nos suscribimos
      console.log('Créditos:', credits);
    },
    error: (error) => console.error('Error obteniendo créditos:', error)
  });}


  //funcion para pasar puntos a estrellitas
  estrellas(votos:number){ //aca me va a recibir la puntuacion es decir el movie.vote_average

    // Verifica si 'votos' es un número válido
   if (isNaN(votos) || votos < 0) {//isNaN  es una funcion que se utliza para identificar si el valor no es un numero
    votos = 0; // Si no es un numero , asigna 0
    }
    const contadorEstrellas = Math.floor(votos) // voy a convertir los decimales que el recibe a un entero
     // Si 'contadorEstrellas' es negativo o cero, asegura que el arreglo tenga al menos un valor
      if (contadorEstrellas <= 0) {
        return Array(1).fill(0); // Mínimo un cero (estrella)
        }
        return Array(contadorEstrellas).fill(0) // aca el entero que recibe los va a convertir en ceros
        //si recibe 6 el arreglo va a ser [0 0 0 0 0 0] y esas van a ser las estrellas a mostrar
  }
}
