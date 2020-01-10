import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem/exame-listagem.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';
import { CandidatoFormComponent } from './candidato-form/candidato-form.component';
import { InscricaoListagemComponent } from './inscricao-listagem/inscricao-listagem.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'listagemCandidatos', component: CandidatoListagemComponent },
  { path: 'listagemExames', component: ExameListagemComponent },
  { path: 'listagemIncricao', component: InscricaoListagemComponent },
  { path : 'novoExame', component: ExameFormComponent },
  { path : 'exames/:id', component: ExameFormComponent },
  { path : 'candidatos/:id', component: CandidatoFormComponent },
  { path : 'exameCandidato/:exame/:candidato', component: InscricaoFormComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
