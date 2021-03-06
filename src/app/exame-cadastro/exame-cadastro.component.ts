import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExameService } from './../exame/exame.service';


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
              private toastrService: ToastrService
    ) { }


  ngOnInit() {
    this.exame = {};
  }

  listar() {
    this.exameService.listar().subscribe(dados => this.exames = dados);
  }

  criar(form: FormControl) {
    if (this.validarEmail(this.exame.email)) {
      if (this.exame.nome != null && this.exame.vagas != null) {
        this.exameService.criar(this.exame).subscribe({
          next: resposta => {
            form.reset();
            this.concluido.emit(true);
            this.toastrService.success('Exame cadastrado com sucesso!');

          },
          error: (e) => {
            this.toastrService.error('Ops... Ocorreu algum erro incomum em sua requisição');
            console.log(e);
          }
        });

    } else {
      this.toastrService.error('Não é possível efetuar o cadastro com campos vazios');
    }
  } else {
    this.toastrService.error('O e-mail digitado já existe. Por favor, insira outro!');
  }
  }

  validarEmail(email: string) {
    if (this.exameService.carregarPeloEmail(email) != null) {
      return true;
    }
    return false;
  }
}
