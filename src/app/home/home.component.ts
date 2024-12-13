import { Component, HostListener, OnInit,inject } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../models/peliculas.models';
import { environment } from '../../environments/environment.development';
import { ResponseGetMovies } from '../models/response-get-movies.model';
import { MoviesService } from "../providers/peliculas.service";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [BuscadorComponent, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit { // yo le digo implement onInit para decirle que a esta clase le voy a añadir una interface que lleva una funcion
  title = 'AppMovie';
  moviesList: Pelicula[] = []; // a moviesList la estoy tipando con Pelicula[] diciendole que lo que va a recibir debe llevar esa interface

  page: number = 1; // Página actual (empezamos con la página 1) la que me inicia a dar la API
  loading: boolean = false; // Estado para saber si estamos cargando más películas es decir pidiendo mas

  environments = environment //para usar las url de las imagenes

  private readonly moviesService = inject(MoviesService); //le inyecto la clase movieServe
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.loadMovies(); // Cargamos las primeras películas al inicio pagina 1
  }


  loadMovies(): void {
    if (this.loading) return; // Evitar que se haga la solicitud si ya estamos cargando peliculas

    this.loading = true; // Activamos el estado de carga si pide mas peliculas

    // Llamamos al servicio para obtener las películas de la página actual
    this.moviesService.getMovies(this.page).subscribe({ // le pasamos this.page es la que tiene la pagina actual, usamos el suscribe para continuar
      next: (data) => {
        console.log(data);

        const res = data as ResponseGetMovies; // aca le estoy diciendo a data que se comporte como responseGetMovies pero solo en la constante res

        this.moviesList = [...this.moviesList, ...res.results]; // Agregamos las nuevas películas a la lista
        console.log(res.results);


        this.page++; // Aumentamos la página para la siguiente solicitud es decir pide otra pagina va pagina 1 que la 2 y asi sucesivamente
        this.loading = false; // Desactivamos el estado de carga
      },
      error: (error) => {
        console.error(error);
        this.loading = false; // Si hay error, desactivamos el estado de carga
      },
    });
  }


  // Función para redirigir a la página de detalles
  clickPelicula(movie: Pelicula): void {
    this.router.navigate([`/home`, movie.id]);  // Redirige a la ruta home/:peliculaId
  }


  // Detecta el scroll y carga más películas cuando llega al final
  @HostListener('window:scroll', []) // este es el que me va avisando cada que llega al final de la pagina la barrita
  onScroll(): void { //esta funcion es creada para cada que voy bajando el me va a ir mostrando esta va a detectar el movimiento
    const scrollPosition = window.scrollY + window.innerHeight; // calcula la posicion de la barra de desplazamiento

    //window.scrollY calcula desde el inicio de la pagina hasta donde va la barra
    //window.innerHeight calcula lo lejos que llego en la pagina es decir si ya estoy por llegar al final

    const documentHeight = document.documentElement.scrollHeight; // Mide altura total de la pagina

    console.log('Scroll Position:', scrollPosition, 'Document Height:', documentHeight);


    if (scrollPosition === documentHeight) { //el condicional importante, compara si son iguales posiciones es decir llego al final de la pagina
      //le pasamos mas peliculas que loadMovies es la encargada de pasar mas peliculas
      this.loadMovies(); //ejecutamos la funcion loadMovies
    }
  }

  estrellas(votos:number){ //aca me va a recibir la puntuacion es decir el movie.vote_average
    const contadorEstrellas = Math.floor(votos) // voy a convertir los decimales que el recibe a un entero
    return Array(contadorEstrellas).fill(0) // aca el entero que recibe los va a convertir en ceros
    //si recibe 6 el arreglo va a ser [0 0 0 0 0 0] y esas van a ser las estrellas a mostrar

  }

}
