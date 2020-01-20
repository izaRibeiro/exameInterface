import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CandidatoService } from '../candidato.service';
import { ExameService } from '../exame.service';
import { InscricaoService } from '../inscricao.service';
import { Inscricao } from '../model/inscricao';
import { Candidato } from '../model/candidato';
import { ToastService } from '../toast.service';
import { ToastrService } from 'ngx-toastr';

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
  usuarioAutenticado;
  candidatoAutenticado;
  exameAutenticado;
  idSession: string;
  modalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: true}) deleteModal;
 
  


  constructor(
    private inscricaoService: InscricaoService,
    private exameService: ExameService,
    private candidatoService: CandidatoService,
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");
    this.candidatoAutenticado = sessionStorage.getItem("usuarioCandidato");
    this.exameAutenticado = sessionStorage.getItem("usuarioExame");
    this.idSession = sessionStorage.getItem("id");

    this.listar();
    
    this.exameService.listar().subscribe(dados => this.exames = dados);
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }

  listar(){
    
    this.inscricaoService.listar().subscribe(dados => this.inscricoes = dados);
  }

  onCreate(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
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
    this.toastr.success("Inscrição deletada com sucesso")
  }

  negarDelete(){
    this.deleteModalRef.hide();
  }

  onEdit(exame, candidato){
    this.router.navigate(['exameCandidato', exame, candidato]);
  }


}
