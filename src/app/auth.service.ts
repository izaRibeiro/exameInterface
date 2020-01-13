import { Usuario } from './model/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { Candidato } from './model/candidato';
import { Router } from '@angular/router';
import { CandidatoService } from './candidato.service';
import { ExameService } from './exame.service';
import { Exame } from './model/exame';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenu = new EventEmitter<boolean>();
  mostrarMenuCandidato = new EventEmitter<boolean>();
  mostrarMenuExame = new EventEmitter<boolean>();
  exame = new Exame();
  candidato = new Candidato();

  constructor(
    private router: Router,
    private candidatoService: CandidatoService,
    private exameService: ExameService
  ) { }

  fazerLogin(usuario: Usuario, usuarioSelecionado){
    this.mostrarMenu.emit(false);
    this.mostrarMenuCandidato.emit(false);
    this.mostrarMenuExame.emit(false);

    if(usuarioSelecionado == "candidato"){
      this.candidato.nome = usuario.nome;
      this.candidato.id = usuario.id;
      this.logarCandidato(this.candidato);
    }else{
      this.exame.nome = usuario.nome;
      this.exame.id = usuario.id;
      this.logarExame(this.exame);
    }
  }

  logarCandidato(candidato: Candidato){
    this.candidatoService.carregarPeloId(candidato.id).subscribe(

      (res: Candidato) =>  {

          if(res.id == candidato.id && res.nome == candidato.nome){
            this.mostrarMenu.emit(true);
            this.mostrarMenuCandidato.emit(true);
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
          if(res.id == exame.id && res.nome == exame.nome){
            this.mostrarMenu.emit(true);
            this.mostrarMenuExame.emit(true);
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

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  autenticarUsuario(){
    console.log(this.usuarioAutenticado);
    return this.usuarioAutenticado;
  }
}
