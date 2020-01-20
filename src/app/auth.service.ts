import { timer, Subscription } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatoService } from './candidato.service';
import { ExameService } from './exame.service';
import { Candidato } from './model/candidato';
import { Exame } from './model/exame';
import { Usuario } from './model/usuario';
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado = JSON.parse(sessionStorage.getItem('usuarioAutenticado') || 'false');

  mostrarMenu = new EventEmitter<boolean>();
  mostrarMenuCandidato = new EventEmitter<boolean>();
  mostrarMenuExame = new EventEmitter<boolean>();
  exame = new Exame();
  candidato = new Candidato();
  emailUsuario: string;
  senhaUsuario: string;
  private timerSubscription: Subscription;

  constructor(
    private router: Router,
    private candidatoService: CandidatoService,
    private exameService: ExameService,
    private toastrService: ToastrService
  ) { }

  fazerLogin(usuario: Usuario, usuarioSelecionado) {


    this.mostrarMenu.emit(false);
    this.mostrarMenuCandidato.emit(false);
    this.mostrarMenuExame.emit(false);
    sessionStorage.setItem('usuarioAutenticado', 'false');
    sessionStorage.setItem('usuarioCandidato', 'false');
    sessionStorage.setItem('usuarioExame', 'false');
    sessionStorage.setItem('id', '');

    if (usuarioSelecionado === 'candidato') {
      this.defineCandidato(usuario);
      this.logarCandidato(this.candidato);
    } else if (usuarioSelecionado === 'exame') {
      this.defineExame(usuario);
      this.logarExame(this.exame);
    } else {
      this.toastrService.error('Tipo de usuário indefinido');
    }
  }


  defineCandidato(usuario: Usuario) {
    this.candidato.email = usuario.email;
    this.candidato.senha = usuario.senha;
  }

  defineExame(usuario: Usuario) {
    this.exame.email = usuario.email;
    this.exame.senha = usuario.senha;
  }

  logarCandidato(candidato: Candidato) {
    this.candidatoService.carregarPeloEmail(candidato.email).subscribe(
      (res: Candidato) => {

        this.encorparLogin(res, candidato);
        sessionStorage.setItem('usuarioCandidato', 'true');

      }, err => {

        this.toastrService.error('E-mail ou senha incorreto');
        this.usuarioAutenticado = false;

      }
    );
  }

  logarExame(exame: Exame) {
    this.exameService.carregarPeloEmail(exame.email).subscribe(
      (res: Exame) => {

        this.encorparLogin(res, exame);
        sessionStorage.setItem('usuarioExame', 'true');

      }, err => {

        this.toastrService.error('E-mail ou senha incorretos');

      }
    );
  }

  encorparLogin(res, usuario) {
    if (res.email === usuario.email && res.senha === usuario.senha) {
      this.exibirMenu();

      sessionStorage.setItem('usuarioAutenticado', 'true');

      sessionStorage.setItem('id', res.id.toString());

      this.toastrService.success('Login efetuado com sucesso!!');
      this.router.navigateByUrl('');
      this.usuarioAutenticado = true;
    } else {
      this.toastrService.error('E-mail ou senha incorretos');
    }
  }

  exibirMenu() {
    this.mostrarMenu.emit(true);
  }

  esconderMenu() {
    this.mostrarMenu.emit(false);
  }

  logout() {
    sessionStorage.clear();
    this.esconderMenu();
    this.toastrService.info('Você saiu do sistema');
    this.router.navigate(['/login']);
  }

  autenticarUsuario() {
    this.usuarioAutenticado = sessionStorage.getItem('usuarioAutenticado');
    return this.usuarioAutenticado;
  }

}
