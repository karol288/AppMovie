import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar', //nombre d mi componente
  imports: [],
  templateUrl: './navbar.component.html', //se llama la ruta de html para que este en el componente
  styleUrl: './navbar.component.css'
})
export class navbarComponent implements OnInit {

 private readonly router = inject(Router); //agregamos el router

  ngOnInit(): void {

  }

  buscarPelicula(texto:string){ //va a recibir el texto desde el input
    texto = texto.trim(); //el trim elimina espacios en blanco que pudo haber puesto el usuario
    if (texto.length === 0){
      return // Si no se escribe nada, no hace nada.
    }

    this.router.navigate(['/buscar', texto])
  }
}
