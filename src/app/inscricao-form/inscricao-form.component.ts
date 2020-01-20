import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../model/inscricao';
import { FormGroup } from '@angular/forms';
import { InscricaoService } from '../inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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

  
  listar(){
    
    this.inscricaoService.listar().subscribe(dados => this.inscricoes = dados);
  }

  adicionarNota(inscricao){
    console.log('nota: ' + inscricao.nota);
    if(inscricao.nota != null){
        if(inscricao.nota >= 0 && inscricao.nota <= 100){
          this.inscricaoService.adicionarNota(this.inscricao, this.idexame, this.idcandidato)
          .subscribe({
            next: resp=>{
              
              this.toastr.success("Nota editada com sucesso!");

              this.router.navigateByUrl("listagemIncricao");
            }, 
            error: (e)=>console.log(e)

        });

      }else{
        this.toastr.error("A nota deve obrigatóriamente estar entre 0 e 100!");
      }
    }
  }

  voltar(){
    this.router.navigateByUrl('listagemIncricao');
  }

  
}
