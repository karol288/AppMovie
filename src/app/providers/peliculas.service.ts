import { HttpClient } from '@angular/common/http'; //importamos el httpClien para hacer las petiicones
import { inject, Injectable } from '@angular/core';//inject para dentro de la clase y cuando son servicios se usa injectable
import { environment } from '../../environments/environment.development';

// se usa el Injectable para decir que en la clase voy a usar servicios
@Injectable({//@ es para un decorador
  providedIn: 'root',
})
export class MoviesService { //Movie service va a ser una clase que va a llevar informacion de un lugar a otro haciendo un servicio
  private readonly http = inject(HttpClient); //a la constante http se le inyecta la clase de httpClient que es para hacer peticiones
  private readonly environments = environment; // a la constante environments se le esta pasando las variables de entorno que tengo yo creadas

  getMovies(page: number) {  //va a recibir las paginas que nos va dando la api
    console.log(page);

    return this.http.get(this.environments.getMoviesUrl, {
      headers: {
        Authorization: `Bearer ${this.environments.readToken}`, // para ingresar el token
      },
      params: {// el param es como tal enviarle un mensaje a la api diciendole dame la pagina x
        page: page.toString(), // a page lo convertimos en string ya que si le estamos pasando un parametro el lo recibe es en dato string
      },
    });
  }

  getGenres() {
    return this.http.get(this.environments.getGenresUrl, {
      headers: {
        Authorization: `Bearer ${this.environments.readToken}`,
      },
    });
  }

  getMovieById(id: string) {
    return this.http.get(`${this.environments.getMovieByIdUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.environments.readToken}`,
      },
    });
  }
}
