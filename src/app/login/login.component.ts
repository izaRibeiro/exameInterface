import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Candidato } from '../model/candidato';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private candidato: Candidato = new Candidato();
  private usuario: Usuario = new Usuario();
  //private object: Object = new Object();
  private selecaoUsuario: String;

  constructor(
    private authService: AuthService

  ) { }

  ngOnInit() {
  }

  efetuarLogin(){
    this.authService.fazerLogin(this.usuario, this.selecaoUsuario);
    
  
  }
}
