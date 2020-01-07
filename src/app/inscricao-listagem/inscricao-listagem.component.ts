import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InscricaoService } from '../inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Inscricao } from '../model/inscricao';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(
    private inscricaoService: InscricaoService,
    private http: HttpClient,
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    
    this.inscricaoService.listar().subscribe(dados => this.inscricoes = dados);
  }

  criar(){
    this.inscricaoService.criar(this.inscricao).subscribe(resposta => {
      this.inscricoes.push(resposta);
      this.inscricao = new Inscricao();
    });

  }

  remover(inscricao){
    this.inscricaoService.remover(inscricao).subscribe();
    document.location.href = "http://localhost:4200/listagemIncricao";
  }

  onEdit(exame, candidato){
    this.router.navigate(['exameCandidato', exame, candidato]);
  }

}
