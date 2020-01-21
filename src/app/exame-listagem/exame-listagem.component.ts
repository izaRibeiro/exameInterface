import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
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
              private router: Router,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private authService: AuthService
    ) { }


  ngOnInit() {
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");
    this.candidatoAutenticado = sessionStorage.getItem("usuarioCandidato");
    this.exameAutenticado = sessionStorage.getItem("usuarioExame");
    this.idSession = sessionStorage.getItem("id");
    this.exame = {};
    this.listar();
  }

  listar() {
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  onCreate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  remover(exame) {
      this.exameService.remover(exame).subscribe(() => this.listar());
  }

  onDelete(exame) {
    this.exame = exame;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarDelete() {
    this.remover(this.exame);
    this.deleteModalRef.hide();
    this.toastr.success("Exame deletado com sucesso");
    this.authService.logout();
  }

  negarDelete() {
    this.deleteModalRef.hide();
  }

  onEdit(id) {
    this.router.navigate(['exames', id]);
  }


  fecharModal() {
    this.modalRef.hide();
    this.listar();
  }
}
