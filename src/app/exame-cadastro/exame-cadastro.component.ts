import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Exame } from '../model/exame';
import { ExameService } from './../exame/exame.service';


@Component({
  selector: 'app-exame-cadastro',
  templateUrl: './exame-cadastro.component.html',
  styleUrls: ['./exame-cadastro.component.css']
})
export class ExameCadastroComponent implements OnInit {

  exames: Array<any>;
  exame: any;
  novo: boolean;
  @Output() concluido: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private exameService: ExameService,
    private router: Router
    ) { }


  ngOnInit() {
    this.exame = {};
    this.novo = false;
  }

  listar(){
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  criar(){
    if(this.validarEmail(this.exame.email)){
      if(this.exame.nome != null && this.exame.vagas != null){
        this.exameService.criar(this.exame).subscribe({
          
          next: resposta => {
            this.exame = new Exame();
            alert("Exame cadastrado com sucesso!");
            //this.listar();
            this.concluido.emit(true);
          },
          error: (e)=>console.log(e)
        });

    }else{
      alert("Não é possível efetuar o cadastro com campos vazios");
    }
  }else{
    alert("O e-mail digitado já existe. Por favor, insira outro!");
  }
  }


  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

  validarEmail(email: string){
    if(this.exameService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }
}
