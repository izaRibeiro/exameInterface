import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatoService } from './candidato.service';
import { ExameService } from './exame.service';
import { Candidato } from './model/candidato';
import { Exame } from './model/exame';
import { Usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private usuarioAutenticado: boolean = false;
  private usuarioAutenticado = JSON.parse(sessionStorage.getItem("usuarioAutenticado") || "false");

  mostrarMenu = new EventEmitter<boolean>();
  mostrarMenuCandidato = new EventEmitter<boolean>();
  mostrarMenuExame = new EventEmitter<boolean>();
  exame = new Exame();
  candidato = new Candidato();
  emailUsuario: string;
  senhaUsuario: string;

  constructor(
    private router: Router,
    private candidatoService: CandidatoService,
    private exameService: ExameService
  ) { }

  fazerLogin(usuario: Usuario, usuarioSelecionado){
    this.mostrarMenu.emit(false);
    this.mostrarMenuCandidato.emit(false);
    this.mostrarMenuExame.emit(false);
    sessionStorage.setItem("usuarioAutenticado", "false");

    if(usuarioSelecionado == "candidato"){

      this.defineCandidato(usuario);
      this.logarCandidato(this.candidato);
    }else{
      this.defineExame(usuario);
      this.logarExame(this.exame);
    }
  }


  defineCandidato(usuario: Usuario){
    this.candidato.id = usuario.id;
    this.candidato.email = usuario.email;
    this.candidato.senha = usuario.senha;
  }

  
  defineExame(usuario: Usuario){
    this.exame.id = usuario.id;
    this.exame.email = usuario.email;
    this.exame.senha = usuario.senha;
  }

  logarCandidato(candidato: Candidato){
    this.candidatoService.carregarPeloId(candidato.id).subscribe(

      (res: Candidato) =>  {
          if(res.id == candidato.id && res.email == candidato.email && res.senha == candidato.senha){
            this.exibirMenu();

            sessionStorage.setItem("usuarioAutenticado", "true");

            console.log(sessionStorage.getItem("usuarioAutenticado"));

            alert("Login efetuado com sucesso!!");

            this.router.navigateByUrl('');
            this.usuarioAutenticado = true;
          }else{
            alert("Nome ou id incorretos");
            this.usuarioAutenticado = false;
          }
      },  err => {
        alert("Nome ou id incorretos");
        this.usuarioAutenticado = false;
      }

    );
  }

  logarExame(exame: Exame){
    this.exameService.carregarPeloId(exame.id).subscribe(

      (res: Exame) =>  {
          if(res.id == exame.id && res.email == exame.email && res.senha == exame.senha){
            this.exibirMenu();

            sessionStorage.setItem("usuarioAutenticado", "true");

            console.log(sessionStorage.getItem("usuarioAutenticado"));

            alert("Login efetuado com sucesso!!");

            this.router.navigateByUrl('');
            this.usuarioAutenticado = true;

          }else{
            alert("Nome ou id incorretos");
            sessionStorage.setItem("usuarioAutenticado", "false");
            this.usuarioAutenticado = false;

          }
      },  err => {
        alert("Nome ou id incorretos");
        this.usuarioAutenticado = false;
      }

    );
  }
  
  exibirMenu(){
    this.mostrarMenu.emit(true);
  }

  esconderMenu(){
    this.mostrarMenu.emit(false);
  }

  logout(){
    //sessionStorage.removeItem('usuarioAutenticado');
    sessionStorage.setItem("usuarioAutenticado", "false");
    this.esconderMenu();
    this.router.navigate(['/login']);
  }

  autenticarUsuario(){
    console.log(sessionStorage.getItem("usuarioAutenticado"));
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado") ;
    return this.usuarioAutenticado;
  }
}
