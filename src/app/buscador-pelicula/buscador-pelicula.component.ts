import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MoviesService } from '../providers/peliculas.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { Pelicula } from '../models/peliculas.models';


@Component({
  selector: 'app-buscador-pelicula',
  imports: [CommonModule, RouterModule,],
  templateUrl: './buscador-pelicula.component.html',
  styleUrl: './buscador-pelicula.component.css'
})
export class BuscadorPeliculaComponent implements OnInit {

  environments = environment //usar ruta de la imagen de la pelicula

  private readonly Activeroute = inject(ActivatedRoute); // este es para el params en buscar pelicula

  private readonly router = inject(Router);//este es para el click peliculas

  private readonly service = inject(MoviesService) //inyectamos el servicio

  //lo siguiente va a ser el buscador de peliculas

  peliculas: any[] = []; // Aquí se guardaran los resultados de las búsquedas
  texto: string = ''; // Para almacenar el texto que ingresa el usuario
  noPelicula: string = ''; //por si no encuentra la pelicula esta va a guardar el mensaje de error



  //esta va a ser la encargada de buscar el texto y ejecutar la funcion buscar peliculas esto es lo primero que va a hacer
  ngOnInit(): void {
    this.Activeroute.params.subscribe(params => {//aca se prepara todo para lo que van a escuchar en la ruta
      this.texto = params['texto']; // Aca le estamos pasandoa texto  el parametro de texto, en texto se guardara lo que el usuario escribio en el buscador
      this.buscarPeliculas(); // Llamas a la función para hacer la búsqueda
    });
  console.log(this.texto);

  }


  //esta funcion va a ser la encargada de buscar la pelicula por el texto
  buscarPeliculas() {
    this.service.getMovie(this.texto).subscribe((res: any) => { //decir que res va ser de tipo any es porqueel va a recibir cualquier tipo de dato
      if (res.results && res.results.length === 0){ // es decir si no hay ninguna pelicula diga que no hay pelicula
        this.noPelicula = 'pelicula no encontrada'
      } else {
        this.noPelicula = ''; // Limpia el mensaje si no hay resultados
        this.peliculas = res.results; // Guarda las películas encontradas es results porque ahi es donde la API guarda la informacion pedida
      }
      console.log(this.noPelicula);


    });
  }

  // lo siguiente es ya para el diseño de las peliculas, es decir como se van a ver cuando el le de en buscar


  // Función para mandarme a la página de detalles-pelicula
  clickPelicula(movie: Pelicula): void { //tipo a movie como pelicula
    this.router.navigate([`/home`, movie.id]);  // Redirige a la ruta home/:peliculaId
  }

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



