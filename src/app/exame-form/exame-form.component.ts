import { HttpClient } from '@angular/common/http';


import { ExameService } from './../exame.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrls: ['./exame-form.component.css']
})
export class ExameFormComponent implements OnInit {

  exame: any;
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
    //private router: Router,
    
    private service: ExameService,
    private http: HttpClient

    ) { }

  ngOnInit() {
    /*this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      console.log('id: ' + this.id);
    }
    
    const exame = this.service.carregarPeloId(this.id);
    exame.subscribe(exame => {
          this.updateForm(exame);
        });

   /* this.exameService.carregarPeloId(this.id).subscribe(res => {
      this.request = {
        nome: res.data.nome;
      }
    });*/

   /* this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        console.log(this.id);
        const exame = this.service.carregarPeloId(id);
        exame.subscribe(exame => {
          this.updateForm(exame);
        });
      }
    );*/

    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      });

      this.http.get("http://localhost:5555/products").subscribe(
        (res: Response) => {
          //this.exames = res.json();
          for(var i = 0; i < this.exames.length ; i++) {
            if(parseInt(this.exames[i].id) === this.id) {
              this.exist = true;
              this.data = this.exames[i];
              break;
            } else {
              this.exist = false;
            }
          }
        }
      )


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

  updateForm(exame){
    this.form.patchValue({
      id: exame.id,
      nome: exame.nome
    })
  }

  /*criar(formExame: FormGroup){
    this.exameService.criar(this.exame).subscribe(resposta => {
      this.exames.push(resposta);
      formExame.reset();
    });
  }*/
  editar(formExame: FormGroup){
    /*this.exameService.carregarPeloId(this.exame).subscribe(resposta => {
      this.exame.push(resposta);
      formExame.reset();
    });*/
  }

}
