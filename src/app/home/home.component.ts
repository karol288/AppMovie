import { Component, HostListener, OnInit,inject } from '@angular/core';
import { navbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../models/peliculas.models';
import { environment } from '../../environments/environment.development';
import { ResponseGetMovies } from '../models/response-get-movies.model';
import { MoviesService } from "../providers/peliculas.service";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [navbarComponent, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit { // yo le digo implement onInit para decirle que a esta clase le voy a añadir una interface que lleva una funcion


  moviesList: Pelicula[] = []; // a moviesList la estoy tipando con Pelicula[] diciendole que lo que va a recibir debe llevar esa interface

  page: number = 1; // Página actual (empezamos con la página 1) la que me inicia a dar la API
  loading: boolean = false; // Estado para saber si estamos cargando más películas es decir pidiendo mas

  environments = environment //para usar las url de las imagenes

  private readonly moviesService = inject(MoviesService); //le inyecto la clase movieServe

  private readonly router = inject(Router); //Para llevarme a la ruta de peliculaId


  ngOnInit(): void {
    this.loadMovies(); // Cargamos las primeras películas al inicio pagina 1
  }


  loadMovies(): void { //void no haga nada pero si algo con los datos

    if (this.loading) return; // Evitar que se haga la solicitud si ya estamos cargando peliculas

    this.loading = true; // Activamos el estado de carga si pide mas peliculas

    // Llamamos al servicio para obtener las películas de la página actual
    this.moviesService.getMovies(this.page).subscribe({ // le pasamos this.page es la que tiene la pagina actual, usamos el suscribe para continuar
      next: (data) => {

        console.log(data);

        const res = data as ResponseGetMovies; // aca le estoy diciendo a data que se comporte como responseGetMovies pero solo en la constante res

        this.moviesList = [...this.moviesList, ...res.results]; // Agregamos las nuevas películas a la lista el operador ... es para combinar entonces
        //...this.movieslist y ...res.results se van a combinar y todas se van a guardar en moviesList

        console.log(res.results);


        this.page++; // Aumentamos la página para la siguiente solicitud es decir pide otra pagina va pagina 1 que la 2 y asi sucesivamente
        console.log(this.page);

        this.loading = false; // Desactivamos el estado de carga
      },
      error: (error) => {
        console.error(error);
        this.loading = false; // Si hay error, desactivamos el estado de carga
      },
    });
  }


  // Función para mandarme a la página de detalles-pelicula
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
