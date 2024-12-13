import { Component} from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa el RouterModule

@Component({
  selector: 'app-root', //como se va a llamar el componente
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ RouterModule ]
})
export class AppComponent  {
  title = 'AppMovie';
}
