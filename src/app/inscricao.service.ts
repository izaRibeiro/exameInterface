import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {
  inscricaoUrl = "http://localhost:8080/exameCandidato";

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any[]>(`${this.inscricaoUrl}`);
  }

  criar(inscricao: any){
    return this.http.post(this.inscricaoUrl , inscricao);
  }

  remover(inscricao){
    return this.http.delete(`${this.inscricaoUrl}/${inscricao.exame}/${inscricao.candidato}`);
  }

  carregarPeloId(id){
    //return this.http.get(`${this.inscricaoUrl }/${id}`);
  }

  update(id, inscricao){
    const url = `${this.inscricaoUrl }/${id}`;

    return this.http.put(url, inscricao);
  }

  adicionarNota(inscricao, idexame, idcandidato){
    inscricao.exame = idexame;
    inscricao.candidato = idcandidato;
    return this.http.put(`${this.inscricaoUrl }/${idexame}/${idcandidato}` , inscricao);
  }

}
