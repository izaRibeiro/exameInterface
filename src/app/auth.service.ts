import { Injectable } from '@angular/core';
import { Candidato } from './model/candidato';
import { Router } from '@angular/router';
import { CandidatoService } from './candidato.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private candiatoAutenticado: boolean = false;

  constructor(
    private router: Router,
    private candidatoService: CandidatoService
  ) { }

  fazerLogin(candidato: Candidato){
    console.log("Id: " + candidato.id);
    console.log("Nome: " + candidato.nome);


    if(candidato.nome == 'iza' && candidato.id == 555){

      this.candiatoAutenticado = true;
      
      console.log("Logou!!!!");
      alert("Usuário logado com sucesso!");
      this.router.navigateByUrl('');
    }else{
      console.log("Não logou");
      alert("Nome ou id incorretos");
      this.candiatoAutenticado = false;
    }
  }
}
