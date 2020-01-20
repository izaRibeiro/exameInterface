import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoService } from '../candidato.service';
import { ExameService } from './../exame.service';
import { InscricaoListagemComponent } from './../inscricao-listagem/inscricao-listagem.component';
import { InscricaoService } from './../inscricao.service';
import { Inscricao } from './../model/inscricao';
import { ToastrService } from 'ngx-toastr';

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
  usuarioAutenticado;
  candidatoAutenticado;
  exameAutenticado;
  idSession: string;

  constructor(

    private inscricaoService: InscricaoService,
    private exameService: ExameService,
    private candidatoService: CandidatoService,
    private http: HttpClient,
    private router: Router,
    private inscricaoListagem: InscricaoListagemComponent,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");
    this.candidatoAutenticado = sessionStorage.getItem("usuarioCandidato");
    this.exameAutenticado = sessionStorage.getItem("usuarioExame");
    this.idSession = sessionStorage.getItem("id");

    this.exameService.listar().subscribe(dados => this.exames = dados);
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
    console.log("Exames: " + this.exames);
    console.log("Candidatos: " + this.candidatos);
  }

  criar(form: FormGroup){

    if(this.inscricao.candidato != null && this.inscricao.exame){
      this.inscricaoService.criar(this.inscricao).subscribe(
        () => {

          form.reset();
          
          this.toastr.success("Inscrição cadastrada com sucesso!");
          this.inscricaoListagem.listar();
          
        },
        error => {
          console.log(error);
        }
      );
     }else{
       this.toastr.error("Não é possível efetuar o cadastro com campos vazios");
    }
  }



}
