import { ExameListagemComponent } from './../exame-listagem/exame-listagem.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExameService } from './../exame.service';
import { InscricaoService } from './../inscricao.service';
import { InscricaoListagemComponent } from './../inscricao-listagem/inscricao-listagem.component';
import { Inscricao } from './../model/inscricao';
import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../candidato.service';

@Component({
  selector: 'app-inscricao-cadastro',
  templateUrl: './inscricao-cadastro.component.html',
  styleUrls: ['./inscricao-cadastro.component.css']
})
export class InscricaoCadastroComponent implements OnInit {

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
    private inscricaoListagem: InscricaoListagemComponent
  ) { }

  ngOnInit() {
 
    this.exameService.listar().subscribe(dados => this.exames = dados);
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
    console.log("Exames: " + this.exames);
    console.log("Candidatos: " + this.candidatos);
  }

  criar(){

    if(this.inscricao.candidato != null && this.inscricao.exame){
      this.inscricaoService.criar(this.inscricao).subscribe(
        () => {
          alert("Inscrição cadastrada com sucesso!");
          this.inscricao = new Inscricao();
          this.inscricaoListagem.listar();
        },
        error => {
          console.log(error);
        }
      );
     }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }
  }



}
