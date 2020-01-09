import { CandidatoService } from './../candidato.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidato } from '../model/candidato';

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

  onEdit(id){
    this.router.navigate(['candidatos', id]);
  }

}
