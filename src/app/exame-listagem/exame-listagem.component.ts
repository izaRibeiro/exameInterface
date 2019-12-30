import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';
import { ExameService } from './../exame.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { relative } from 'path';

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

  constructor(private exameService: ExameService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.exame = {};
    this.listar();
  }

  listar(){
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  criar(formExame: FormGroup){
    this.exameService.criar(this.exame).subscribe(resposta => {
      this.exames.push(resposta);
      formExame.reset();
    });
  }

  remover(exame){
      this.exameService.remover(exame).subscribe();
  }

  editar(id){
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onEdit(id){
    this.router.navigate(['exames', id]);
  }


}
