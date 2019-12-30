import { CandidatoService } from './../candidato.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})
export class CandidatoListagemComponent implements OnInit {

  candidatos: Array<any>;
  candidato: any;

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit() {
    this.candidato =  {};
    this.listar();
  }

  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }

  criar(formCandidato: FormGroup){
    this.candidatoService.criar(this.candidato).subscribe(resposta => {
      this.candidatos.push(resposta);
      formCandidato.reset();
    });
  }

  remover(candidato){
    this.candidatoService.remover(candidato).subscribe();
  }



}
