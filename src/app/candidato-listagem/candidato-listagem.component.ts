import { CandidatoFormComponent } from './../candidato-form/candidato-form.component';
import { CandidatoCadastroComponent } from './../candidato-cadastro/candidato-cadastro.component';
import { AppModule } from './../app.module';
import { timer } from 'rxjs';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { Candidato } from '../model/candidato';
import { CandidatoService } from './../candidato.service';

@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})
export class CandidatoListagemComponent implements OnInit {

  candidatos: Array<any>;
  candidato: Candidato = new Candidato();
  id: number;
  novo: boolean;
  modalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: true}) deleteModal: BsModalRef;

  
  constructor(private candidatoService: CandidatoService,
    private router: Router,
    private modalService: BsModalService,
    private service: CandidatoService
) { }

  ngOnInit() {
    this.listar();
    this.novo = false;

    const candidato = this.service.carregarPeloId(this.id);
    candidato.subscribe(candidato => {
          this.update(candidato);
        });
  }

  listar(){
    this.candidatoService.listar().subscribe(dados => this.candidatos = dados);
  }


  onCreate(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  criar(){
    if(this.validarEmail(this.candidato.email)){
      if(this.candidato.nome != null && this.candidato.cidade != null){
        this.candidatoService.criar(this.candidato).subscribe({
        
          next: resposta => {
            this.candidatos.push(resposta);
            this.candidato = new Candidato();
            alert("Candidato cadastrado com sucesso!");
            this.modalRef.hide();
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

  remover(candidato){
    this.candidatoService.remover(candidato).subscribe(() => this.listar());
  }

  onDelete(candidato){
    this.candidato = candidato;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.remover(this.candidato);
    this.deleteModalRef.hide();
  }

  negarDelete(){
    this.deleteModalRef.hide();
  }


  update(candidato){
    this.candidato = candidato;
  }

  onEdit(id, template){
    //this.router.navigate(['candidatos', id]);
    this.modalRef = this.modalService.show(template);
  }

  editar(){
    if(this.candidato.nome != null && this.candidato.cidade){
      this.candidatoService.update(this.id, this.candidato)
      .subscribe({
        next: resp=>{
          alert("Candidato editado com sucesso!");
          //this.candidatoService.listar();
          //this.router.navigateByUrl('listagemCandidatos');
          this.listar();
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


  onNovo(){
    if(this.novo){
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

  validarEmail(email: string){
    if(this.candidatoService.carregarPeloEmail(email) != null){
      return true;
    }
    return false;
  }


}
