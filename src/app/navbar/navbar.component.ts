import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../providers/peliculas.service';
import { Pelicula } from '../models/peliculas.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar', //nombre d mi componente
  imports: [CommonModule],
  templateUrl: './navbar.component.html', //se llama la ruta de html para que este en el componente
  styleUrl: './navbar.component.css'
})
export class navbarComponent implements OnInit {

  generos: any[] = [];  // Array para almacenar los géneros obtenidos de la API


  private readonly moviesService = inject(MoviesService) //inyectamos el servicio
  private readonly router = inject(Router); //agregamos el router

  ngOnInit(): void {
    this.obtenerGeneros(); // Cargar los géneros al iniciar
  }


  //esta va a ser la funcionalidad para el select que hay en el html

  obtenerGeneros(){

    this.moviesService.getGenres().subscribe(
      (res: any) => {
        this.generos = res.genres;  // de la respuesta vamos a sacar los generos ya que asi lo devuelve la API
        //le pasamos a la propiedad genero la respuesta con los generos
      },
      (error) => {
        console.error('Error al obtener géneros', error);
      }
    );
  }

  pasarAGenero(event: Event): void { //uso event ya que el va a seleccionar un genero entonces es un evento una accion
    const selectElement = event.target as HTMLSelectElement; // El event.target apunta exactamente donde sucedio el evento
    //el HTMLselectElement es para decirle ese evento es un lista despegable (select) entonces el va a tratar el vento como tal
    const generoId = selectElement.value; //aca selectElemento va a tener los generos, pero el value es para cuando se escoja uno el va
    //a saber cual id fue y lo va a guardar en generoId

    if (generoId) { //si hay generoId es decir si fue escogido
      this.router.navigate(['/genero', generoId]); // lo llevamos a la pagina donde podra ver las peliculas por el genero escogido
    }
  }

  // Función para buscar películas

  buscarPelicula(texto:string){ //va a recibir el texto desde el input
    texto = texto.trim(); //el trim elimina espacios en blanco que pudo haber puesto el usuario
    if (texto.length === 0){
      return // Si no se escribe nada, no hace nada.
    }

    this.router.navigate(['/buscar', texto])
  }
}
