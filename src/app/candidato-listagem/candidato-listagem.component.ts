import { CandidatoService } from './../candidato.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})
export class CandidatoListagemComponent implements OnInit {

  candidatos: Array<any>;
  candidato: any;

  constructor(private candidatoService: CandidatoService,
    private router: Router
) { }

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
    document.location.href = "http://localhost:4200/listagemCandidatos";
  }

  onEdit(id){
    this.router.navigate(['candidatos', id]);
  }

}
