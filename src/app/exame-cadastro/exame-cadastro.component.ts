import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExameService } from './../exame/exame.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-exame-cadastro',
  templateUrl: './exame-cadastro.component.html',
  styleUrls: ['./exame-cadastro.component.css']
})
export class ExameCadastroComponent implements OnInit {

  exames: Array<any>;
  exame: any;
  @Output() concluido: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private exameService: ExameService,
    private router: Router,
    private toastrService: ToastrService
    ) { }


  ngOnInit() {
    this.exame = {};
  }

  listar(){
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  criar(form: FormControl){
    if(this.validarEmail(this.exame.email)){
      if(this.exame.nome != null && this.exame.vagas != null){
        this.exameService.criar(this.exame).subscribe({
          
          next: resposta => {
            form.reset();
            this.concluido.emit(true);
            this.toastrService.success("Exame cadastrado com sucesso!");
            
          },
          error: (e)=>console.log(e)
        });

    }else{
      this.toastrService.error("Não é possível efetuar o cadastro com campos vazios");
    }
  }else{
    this.toastrService.error("O e-mail digitado já existe. Por favor, insira outro!");
  }
  }

  validarEmail(email: string){
    if(this.exameService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }
}
