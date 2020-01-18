import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Exame } from '../model/exame';
import { ExameService } from './../exame.service';

@Component({
  selector: 'app-exame-listagem',
  templateUrl: './exame-listagem.component.html',
  styleUrls: ['./exame-listagem.component.css']
})
export class ExameListagemComponent implements OnInit {
  exames: Array<any>;
  exame: any;
  exameSelecionado : ExameListagemComponent;
  idSession: string;
  erro: string;
  modalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal' , {static: true}) deleteModal;

  usuarioAutenticado;
  candidatoAutenticado;
  exameAutenticado;

  constructor(private exameService: ExameService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) { }


  ngOnInit() {
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");
    this.candidatoAutenticado = sessionStorage.getItem("usuarioCandidato");
    this.exameAutenticado = sessionStorage.getItem("usuarioExame");
    this.idSession = sessionStorage.getItem("id");
    
    this.exame = {};
    this.listar();
  }

  listar(){
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  onCreate(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  criar(){
    if(this.validarEmail(this.exame.email)){
      if(this.exame.nome != null && this.exame.vagas != null){
        this.exameService.criar(this.exame).subscribe({
          
          next: resposta => {
            this.exames.push(resposta);
            alert("Exame cadastrado com sucesso!");
            this.exame = new Exame();
            this.modalRef.hide();
          },
          error: (e)=> {
            console.log(e.error)
            this.erro = e.error.body;
          }
        });

    }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }
  }else{
    alert("O e-mail digitado já existe. Por favor, insira outro!");
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

  validarEmail(email: string){
    if(this.exameService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }

  fecharModal() {
    this.modalRef.hide();
    this.listar();
  }
}
