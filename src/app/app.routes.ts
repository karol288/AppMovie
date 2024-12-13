import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetallePeliculasComponent } from './detalle-peliculas/detalle-peliculas.component';


export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'home/:peliculaId', component:DetallePeliculasComponent},
    {path: '**', redirectTo:"home", pathMatch:"full" }, //para redireccionar por si ingrega cualquier cosa que no sea una de las rutas lo lleve al home

];
