import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../model/inscricao';
import { FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  adicionarNota(idexame, idcandidato, nota){

  }
}
