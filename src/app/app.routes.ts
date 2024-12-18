import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetallePeliculasComponent } from './detalle-peliculas/detalle-peliculas.component';
import { BuscadorPeliculaComponent } from './buscador-pelicula/buscador-pelicula.component';


export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home/:peliculaId', component:DetallePeliculasComponent},
    {path: 'buscar/:texto', component: BuscadorPeliculaComponent},
    {path: '**', redirectTo:"", pathMatch:"full" }, //para redireccionar por si ingrega cualquier cosa que no sea una de las rutas lo lleve al home

];
