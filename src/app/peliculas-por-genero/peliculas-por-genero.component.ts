import { Component, OnInit, inject } from '@angular/core';
import { Pelicula } from '../models/peliculas.models';
import { MoviesService } from '../providers/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-peliculas-por-genero',
  imports: [CommonModule],
  templateUrl: './peliculas-por-genero.component.html',
  styleUrl: './peliculas-por-genero.component.css'
})
export class PeliculasPorGeneroComponent implements OnInit {

  pelicula: Pelicula[] =[];// Lista de películas del género seleccionado
  generoId!:number; //guardo el id del genero
  environment = environment; //para usar las URL de las imagenes


    private readonly moviesService = inject(MoviesService) //inyectamos el servicio
    private readonly activaterouter = inject(ActivatedRoute); //agregamos el router activo
    private readonly router = inject(Router)

    ngOnInit(): void {
      // Obtener el ID del género desde la URL
      this.activaterouter.params.subscribe(params => {
        this.generoId = +params['id']; // el + es para convertir en numero el Id que este en la URL
        this.obtenerPeliculasPorGenero(); // llamamos a la funcion cargarPleiculasPorGenero
      });
    }

    obtenerPeliculasPorGenero(): void {
      this.pelicula = []; // Limpiar la lista de películas antes de cargar
      let paginaActual = 1; // Página inicial
      const maxPaginas = 500; // Máximo de páginas permitido por TMDB

      const cargarPagina = () => {
        this.moviesService.getMovies(paginaActual).subscribe( //aca le pasp paginaActual ya que el va recibiendo en que pagina va buscando
          (response: any) => { //cuando encuentra las peliculas las guarda en response

            // Filtrar las películas por género
            const peliculasFiltradas = response.results.filter((pelicula: Pelicula) => //filter revisa cada elemento y decide si lo incluye o no
            //y es pelicula:pelicula ya que las peliculas que pase el filter van a ser tipo Pelicula
              pelicula.genre_ids.includes(this.generoId)// aca revisamos si el genero pedido esta dento de la lista
            );

            this.pelicula.push(...peliculasFiltradas); // Agregamos las peliculas verificadas a la lista de peliculas
            //el ... es para que agregue las peliculas de forma individual una por una

            // entonces si no ha llegado a la ultima pagina y no ha superado el limite de paginas
            if (paginaActual < response.total_pages && paginaActual < maxPaginas) {
              //sigue buscando en la otra pagina
              paginaActual++;
              cargarPagina(); // El se llama a si mismo para que se ejecute de nuevo hasta que no queden mas paginas
            }
          },
          (error) => {
            console.error('Error al cargar las películas por género:', error);
          }
        );
      };

    cargarPagina(); // Aca ya es donde el dice listo voy a iniciar por la carga de la primera pagina
  }

  // Función para mandarme a la página de detalles-pelicula
  clickPelicula(movie: Pelicula): void {
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
