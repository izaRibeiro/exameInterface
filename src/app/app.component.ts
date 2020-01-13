import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 /* constructor(){
    console.log(environment.apiUrl);
  }*/
  title = 'enem';

  mostrarMenu: boolean = false;
  mostrarMenuCandidato: boolean = false;
  mostrarMenuExame: boolean = false;

  constructor(private authService: AuthService){
    console.log(environment.apiUrl);
  }

  ngOnInit(){
    this.authService.mostrarMenu.subscribe(
      mostrar => {this.mostrarMenu = mostrar
                  this.mostrarMenuCandidato = mostrar;
                  this.mostrarMenuExame = mostrar;}
    );
  }
}
