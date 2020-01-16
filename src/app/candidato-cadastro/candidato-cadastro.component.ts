import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../candidato.service';
import { Candidato } from '../model/candidato';
import { CandidatoListagemComponent } from '../candidato-listagem/candidato-listagem.component';

@Component({
  selector: 'app-candidato-cadastro',
  templateUrl: './candidato-cadastro.component.html',
  styleUrls: ['./candidato-cadastro.component.css']
})
export class CandidatoCadastroComponent implements OnInit {
  candidatos: Array<any>;
  candidato: any;
  novo: boolean;

  constructor(private candidatoService: CandidatoService,
    private router: Router,
    private candidatoListagem: CandidatoListagemComponent
) { }

  ngOnInit() {
    this.candidato =  {};
    this.novo = false;
  }


  criar(){
    console.log(this.candidato.nome);
    console.log(this.candidato.email);
    console.log(this.candidato.senha);
    if(this.validarEmail(this.candidato.email)){
      if(this.candidato.nome != null && this.candidato.cidade != null){
        this.candidatoService.criar(this.candidato).subscribe({
        
          next: resposta => {
            //this.candidatos.push(resposta);
            this.candidato = new Candidato();
            alert("Candidato cadastrado com sucesso!");
            this.candidatoListagem.listar();
          },
          error: (e)=>console.log(e)
          
        });
      }else{
        alert("Não é possível efetuar o cadastro com campos vazios");
      }
    }else{
      alert("O e-mail digitado já existe. Por favor, insira outro!");
    }
  }

  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

  validarEmail(email: string){
    if(this.candidatoService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }


}
