import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InscricaoService } from '../inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Inscricao } from '../model/inscricao';
import { ThrowStmt } from '@angular/compiler';
import { Candidato } from '../model/candidato';
import { Observable } from 'rxjs';
import { Exame } from '../model/exame';
import { ExameService } from '../exame.service';
import { CandidatoService } from '../candidato.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inscricao-listagem',
  templateUrl: './inscricao-listagem.component.html',
  styleUrls: ['./inscricao-listagem.component.css']
})
export class InscricaoListagemComponent implements OnInit {

  inscricoes: Array<any>;
  inscricao: Inscricao = new Inscricao();
  inscricaoSelecionada : InscricaoListagemComponent;
  exames: Array<any>;
  candidatos: Array<any>;
  novo: boolean;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: true}) deleteModal;


  constructor(
    private inscricaoService: InscricaoService,
    private exameService: ExameService,
    private candidatoService: CandidatoService,
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.listar();
    this.novo = false;
    
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
      this.inscricaoService.criar(this.inscricao).subscribe(
        () => {
          this.listar();
          alert("Inscrição cadastrada com sucesso!");
          this.inscricao = new Inscricao();
        },
        error => {
          console.log(error);
        }
      );
     }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }
  }

  remover(inscricao){
    this.inscricaoService.remover(inscricao).subscribe(() => {
      this.listar();
    });
  }

  onDelete(inscricao){
    this.inscricao = inscricao;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.remover(this.inscricao);
    this.deleteModalRef.hide();
  }

  negarDelete(){
    this.deleteModalRef.hide();
  }

  onEdit(exame, candidato){
    this.router.navigate(['exameCandidato', exame, candidato]);
  }

  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

}
