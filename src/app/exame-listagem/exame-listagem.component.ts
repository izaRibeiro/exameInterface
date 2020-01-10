import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';
import { ExameService } from './../exame.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Exame } from '../model/exame';

@Component({
  selector: 'app-exame-listagem',
  templateUrl: './exame-listagem.component.html',
  styleUrls: ['./exame-listagem.component.css']
})
export class ExameListagemComponent implements OnInit {
  exameUrl = "http://localhost:8080/exames";
  exames: Array<any>;
  exame: any;
  exameSelecionado : ExameListagemComponent;
  erro: string;
  novo: boolean;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal' , {static: true}) deleteModal;

  constructor(private exameService: ExameService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) { }


  ngOnInit() {
    this.exame = {};
    this.listar();
    this.novo = false;
  }

  listar(){
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  criar(){
    if(this.exame.nome != null && this.exame.vagas != null){
      this.exameService.criar(this.exame).subscribe({
        
        next: resposta => {
          this.exames.push(resposta);
          alert("Exame cadastrado com sucesso!");
          this.exame = new Exame();
        },
        error: (e)=> {
          debugger
          console.log(e.error)
          this.erro = e.error.body;
        }
      });

   }else{
    alert("Não é possível efetuar o cadastro com campos vazios");
   }
  }

  remover(exame){
      this.exameService.remover(exame).subscribe(() => this.listar());

  }

  onDelete(exame){
    this.exame = exame;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.remover(this.exame);
    this.deleteModalRef.hide();
  }

  negarDelete(){
    this.deleteModalRef.hide();
  }

  onEdit(id){
    this.router.navigate(['exames', id]);
  }

  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

}
