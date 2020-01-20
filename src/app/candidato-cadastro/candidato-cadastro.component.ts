import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoService } from '../candidato.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-candidato-cadastro',
  templateUrl: './candidato-cadastro.component.html',
  styleUrls: ['./candidato-cadastro.component.css']
})
export class CandidatoCadastroComponent implements OnInit {
  candidatos: Array<any>;
  candidato: any;
  @Output() concluido: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private candidatoService: CandidatoService,
    private router: Router,
    private toastrService: ToastrService
) { }

  ngOnInit() {
    this.candidato =  {};
  }


  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }

  criar(form: FormControl){
    if(this.validarEmail(this.candidato.email)){
      if(this.candidato.nome != null && this.candidato.cidade != null) {
        this.candidatoService.criar(this.candidato).subscribe({
          next: resposta => {
            form.reset();
            this.concluido.emit(true);

            this.toastrService.success("Candidato cadastrado com sucesso!");
          },
          error: (e) => {
            this.toastrService.error("Ops... Ocorreu algum erro incomum em sua requisição");
            console.log(e);
          }
        });
      } else {
          this.toastrService.error("Não é possível efetuar o cadastro com campos vazios");
      }
    } else {
        this.toastrService.error("O e-mail digitado já existe. Por favor, insira outro!");
    }
  }

  validarEmail(email: string){
    if (this.candidatoService.carregarPeloEmail(email) != null) {
      return true;
    }
    return false;
  }

}
