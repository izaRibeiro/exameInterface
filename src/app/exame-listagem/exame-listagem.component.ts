import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';
import { ExameService } from './../exame.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  criar(){
    if(this.exame.nome != null && this.exame.vagas != null){
      this.exameService.criar(this.exame).subscribe({
        
        next: resposta => {
          this.exames.push(resposta);
          alert("Exame cadastrado com sucesso!");
        },
        error: (e)=>console.log(e)
      });

   }else{
    alert("Não é possível efetuar o cadastro com campos vazios");
   }
  }

  remover(exame){
      this.exameService.remover(exame).subscribe();
      document.location.href = "http://localhost:4200/listagemExames";
  }


  onEdit(id){
    this.router.navigate(['exames', id]);
  }


}
