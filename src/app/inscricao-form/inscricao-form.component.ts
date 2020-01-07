import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../model/inscricao';
import { FormGroup } from '@angular/forms';
import { InscricaoService } from '../inscricao.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.css']
})
export class InscricaoFormComponent implements OnInit {

  inscricao: Inscricao= new Inscricao();
  form: FormGroup;
  request: Request;
  idexame: number;
  idcandidato: number;
  inscricoes: Array<any>;

  constructor(
    private inscricaoService: InscricaoService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.idexame = +this.route.snapshot.paramMap.get('exame');
    this.idcandidato = +this.route.snapshot.paramMap.get('candidato');
    if(this.idexame != null){
      console.log('idexame: ' + this.idexame);
    }
    if(this.idcandidato != null){
      console.log('idcandidato: ' + this.idcandidato);
    }
  }

  adicionarNota(inscricao){
    console.log('nota: ' + inscricao.nota);
    
    this.inscricaoService.adicionarNota(this.inscricao, this.idexame, this.idcandidato)
    .subscribe({
      next: resp=>{
        console.log('sucesso');
        alert("Nota editada com sucesso!");
      }, 
      error: (e)=>console.log(e)
    });

    document.location.href = "http://localhost:4200/listagemIncricao";
  }
}
