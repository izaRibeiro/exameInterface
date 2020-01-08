import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InscricaoService } from '../inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Inscricao } from '../model/inscricao';
import { ThrowStmt } from '@angular/compiler';
import { Candidato } from '../model/candidato';
import { Observable } from 'rxjs';
import { Exame } from '../model/exame';
import { runInThisContext } from 'vm';
import { ExameService } from '../exame.service';
import { CandidatoService } from '../candidato.service';

@Component({
  selector: 'app-inscricao-listagem',
  templateUrl: './inscricao-listagem.component.html',
  styleUrls: ['./inscricao-listagem.component.css']
})
export class InscricaoListagemComponent implements OnInit {

  inscricaoUrl = "http://localhost:8080/exameCandidato";
  inscricoes: Array<any>;
  inscricao: Inscricao = new Inscricao();
  inscricaoSelecionada : InscricaoListagemComponent;
  exames: Array<any>;
  candidatos: Array<any>;

  constructor(
    private inscricaoService: InscricaoService,
    private exameService: ExameService,
    private candidatoService: CandidatoService,
    private http: HttpClient,
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.listar();
    
    this.exameService.listar().subscribe(dados => this.exames = dados);
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
    console.log("Exames: " + this.exames);
    console.log("Candidatos: " + this.candidatos);
  }

  listar(){
    
    this.inscricaoService.listar().subscribe(dados => this.inscricoes = dados);
  }


  criar(){

    if(this.inscricao.candidato != null && this.inscricao.exame){
      this.inscricaoService.criar(this.inscricao).subscribe({
        
        next: resposta => {
          this.inscricoes.push(resposta);
          this.inscricao = new Inscricao();
          alert("Inscrição cadastrado com sucesso!");

        },
        error: (e)=>console.log(e)
      });
      document.location.href = "http://localhost:4200/listagemIncricao";
     }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }
  }

  remover(inscricao){
    this.inscricaoService.remover(inscricao).subscribe();
    document.location.href = "http://localhost:4200/listagemIncricao";
  }

  onEdit(exame, candidato){
    this.router.navigate(['exameCandidato', exame, candidato]);
  }

}
