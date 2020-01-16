import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  exameUrl = `${environment.apiUrl}/exames`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any[]>(`${this.exameUrl}`);
  }

  criar(exame: any){
    return this.http.post(this.exameUrl, exame);
  }

  remover(exame){
    return this.http.delete(`${this.exameUrl}/${exame.id}`);
  }

  carregarPeloId(id){
    return this.http.get(`${this.exameUrl}/${id}`);
  }

  carregarPeloEmail(email){
    return this.http.get(`${this.exameUrl}/email/${email}`);
  }

  carregarPelaSenha(senha){
    return this.http.get(`${this.exameUrl}/senha/${senha}`);
  }


  update(id, exame){
    const url = `${this.exameUrl}/${id}`;

    return this.http.put(url, exame);
  }
}
