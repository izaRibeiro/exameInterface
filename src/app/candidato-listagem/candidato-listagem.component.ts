import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Candidato } from '../model/candidato';
import { CandidatoService } from './../candidato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})
export class CandidatoListagemComponent implements OnInit {

  candidatos: Array<any>;
  candidato: Candidato = new Candidato();
  id: number;
  idSession: string;
  modalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: true}) deleteModal: BsModalRef;
  usuarioAutenticado;
  candidatoAutenticado;
  exameAutenticado;
  
  constructor(private candidatoService: CandidatoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private service: CandidatoService,
    private toastr: ToastrService
    
) { }

  ngOnInit() {
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");
    this.candidatoAutenticado = sessionStorage.getItem("usuarioCandidato");
    this.exameAutenticado = sessionStorage.getItem("usuarioExame");
    this.idSession = sessionStorage.getItem("id");

    console.log("Candidato autenticado: " + this.candidatoAutenticado);
    this.listar();
  }

  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }


  onCreate(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
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


  update(candidato){
    this.candidato = candidato;
  }

  onEdit(id, template){
    this.router.navigate(['candidatos', id]);
    
  }

  fecharModal() {
    this.modalRef.hide();
    this.listar();
  }
}
