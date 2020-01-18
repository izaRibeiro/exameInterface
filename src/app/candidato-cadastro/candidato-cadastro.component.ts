import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoService } from '../candidato.service';


@Component({
  selector: 'app-candidato-cadastro',
  templateUrl: './candidato-cadastro.component.html',
  styleUrls: ['./candidato-cadastro.component.css']
})
export class CandidatoCadastroComponent implements OnInit {
  candidatos: Array<any>;
  candidato: any;
  @Output() concluido: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private candidatoService: CandidatoService,
    private router: Router
) { }

  ngOnInit() {
    this.candidato =  {};
  }


  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }

  criar(form: FormControl){
    console.log(this.candidato.nome);
    console.log(this.candidato.email);
    console.log(this.candidato.senha);
    if(this.validarEmail(this.candidato.email)){
      if(this.candidato.nome != null && this.candidato.cidade != null){
        this.candidatoService.criar(this.candidato).subscribe({
        
          next: resposta => {
           
            form.reset();
            this.concluido.emit(true);

            alert("Candidato cadastrado com sucesso!");

            
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

  validarEmail(email: string){
    if(this.candidatoService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }

}
