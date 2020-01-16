import { timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Candidato } from '../model/candidato';
import { Usuario } from './../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private candidato: Candidato = new Candidato();
  private usuario: Usuario = new Usuario();
  private selecaoUsuario: String;
  tempo = timer(3000, 1000);
  interval;

  constructor(
    private authService: AuthService

  ) { }

  ngOnInit() {

  }

  efetuarLogin(){
    //this.startTimer();
    this.authService.fazerLogin(this.usuario, this.selecaoUsuario);
  }

  /*startTimer() {
    this.interval = setInterval(() => {
      if(this.time > 0) {
        this.time--;
      } else {
        this.time = 60;
      }


      console.log(this.interval);
    },1000)
  }*/
}
