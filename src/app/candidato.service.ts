import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  candidatoUrl = "http://localhost:8080/candidatos";

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any[]>(`${this.candidatoUrl}`);
  }

  criar(candidato: any){
    return this.http.post(this.candidatoUrl, candidato);
  }

  remover(candidato){
    return this.http.delete(`${this.candidatoUrl}/${candidato.id}`);
  }

}
