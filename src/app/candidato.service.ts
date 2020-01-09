import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  candidatoUrl = `${environment.apiUrl}/candidatos`;

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

  carregarPeloId(id){
    return this.http.get(`${this.candidatoUrl}/${id}`);
  }

  update(id, candidato){
    const url = `${this.candidatoUrl}/${id}`;

    return this.http.put(url, candidato);
  }



}
