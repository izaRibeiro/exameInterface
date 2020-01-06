import { Component, OnInit } from '@angular/core';
import { Candidato } from '../model/candidato';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidatoService } from '../candidato.service';

@Component({
  selector: 'app-candidato-form',
  templateUrl: './candidato-form.component.html',
  styleUrls: ['./candidato-form.component.css']
})
export class CandidatoFormComponent implements OnInit {

  candidato: Candidato = new Candidato();
  form: FormGroup;
  request: Request;
  id: number;

  constructor(
    private candidatoService: CandidatoService,
    private route: ActivatedRoute,
    private service: CandidatoService,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      console.log('id: ' + this.id);
    }
    
    const candidato = this.service.carregarPeloId(this.id);
    candidato.subscribe(candidato => {
          this.update(candidato);
        });
  }

  
  update(candidato){
    this.candidato = candidato;
    // this.form.patchValue({
    //   id: exame.id,
    //   nome: exame.nome
    // })
  }

  editar(){
    this.candidatoService.update(this.id, this.candidato)
      .subscribe({
        next: resp=>{
          console.log('sucesso');
        }, 
        error: (e)=>console.log(e)
      });
      document.location.href = "http://localhost:4200/listagemCandidatos";
  }
}
