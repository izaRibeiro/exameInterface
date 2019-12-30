import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem/exame-listagem.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';


const routes: Routes = [
  { path: 'listagemCandidatos', component: CandidatoListagemComponent },
  { path: 'listagemExames', component: ExameListagemComponent },
  { path : 'novoExame', component: ExameFormComponent },
  { path : 'exames/:id', component: ExameFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
