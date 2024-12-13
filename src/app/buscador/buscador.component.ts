import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador', //nombre d mi componente
  imports: [],
  templateUrl: './buscador.component.html', //se llama la ruta de html para que este en el componente
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  titulo = 'Buscador de peliculas y series'
}
