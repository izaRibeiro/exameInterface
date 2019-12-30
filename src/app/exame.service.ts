import { ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  exameUrl = "http://localhost:8080/exames";

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

  update(id, exame){
    const url = `${this.exameUrl}/${id}`;

    return this.http.put(url, exame);
  }
}
