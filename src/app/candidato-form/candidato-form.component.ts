import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '../candidato.service';
import { Candidato } from '../model/candidato';

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
    private router: Router
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
  }

  editar(){
      if(this.candidato.nome != null && this.candidato.cidade){
        this.candidatoService.update(this.id, this.candidato)
        .subscribe({
          next: resp=>{
            alert("Candidato editado com sucesso!");
            this.candidatoService.listar();
            this.router.navigateByUrl('listagemCandidatos');
          }, 
          error: (e) =>{
            debugger
            console.log(e.error);
          }
        });
        
     }else{
        
        alert("Não é possível efetuar a edição com campos vazios");
      }
  }

  voltar(){
    this.router.navigateByUrl('listagemCandidatos');
  }

}
