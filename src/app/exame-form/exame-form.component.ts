import { HttpClient } from '@angular/common/http';


import { ExameService } from './../exame.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exame } from '../model/exame';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrls: ['./exame-form.component.css']
})
export class ExameFormComponent implements OnInit {

  exame: Exame = new Exame();
  form: FormGroup;
  request: Request;
  id: number;

  data: object = {};
  exameObj: object = {};
  exames = [];
  exist = false;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  
  constructor(
    private exameService: ExameService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    
    private service: ExameService,
    private http: HttpClient,
    private router: Router

    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      console.log('id: ' + this.id);
    }
    
    const exame = this.service.carregarPeloId(this.id);
    exame.subscribe(exame => {
          this.update(exame);
        });


    this.form = this.fb.group({
      id: [null], 
      nome: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(){
    console.log(this.form.valid);
    if(this.form.valid){
      console.log('submit');
    }
  }

  update(exame){
    this.exame = exame;
  }


  editar(formExame: FormGroup){
    if(this.exame.nome != null && this.exame.vagas != null){
      this.exameService.update(this.id, this.exame)
        .subscribe({
          next: resp=>{
            console.log('sucesso');
            alert("Exame editado com sucesso!");
            this.router.navigateByUrl("listagemExames");
          }, 
          error: (e)=>console.log(e)
        });
    }else{
      alert("Não é possível efetuar a edição com campos vazios");
    }
  }
}
