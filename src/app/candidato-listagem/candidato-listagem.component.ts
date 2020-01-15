import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Candidato } from '../model/candidato';
import { CandidatoService } from './../candidato.service';

@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})
export class CandidatoListagemComponent implements OnInit {

  candidatos: Array<any>;
  candidato: any;
  novo: boolean;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: true}) deleteModal: BsModalRef;;

  constructor(private candidatoService: CandidatoService,
    private router: Router,
    private modalService: BsModalService
) { }

  ngOnInit() {
    this.candidato =  {};
    this.listar();
    this.novo = false;
  }

  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }

  criar(){
    if(this.candidato.nome != null && this.candidato.cidade != null){
      this.candidatoService.criar(this.candidato).subscribe({
      
        next: resposta => {
          this.candidatos.push(resposta);
          this.candidato = new Candidato();
          alert("Candidato cadastrado com sucesso!");
        },
        error: (e)=>console.log(e)
        
      });
    }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }

  }

  remover(candidato){
    this.candidatoService.remover(candidato).subscribe(() => this.listar());
  }

  onDelete(candidato){
    this.candidato = candidato;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.remover(this.candidato);
    this.deleteModalRef.hide();
  }

  negarDelete(){
    this.deleteModalRef.hide();
  }


  onEdit(id){
    this.router.navigate(['candidatos', id]);
  }

  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

}
