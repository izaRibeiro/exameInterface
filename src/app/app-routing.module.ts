import { HomeComponent } from './home/home.component';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem/exame-listagem.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';
import { CandidatoFormComponent } from './candidato-form/candidato-form.component';
import { InscricaoListagemComponent } from './inscricao-listagem/inscricao-listagem.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { LoginComponent } from './login/login.component';
import { AppModule } from './app.module';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [AuthGuardService] },
  { path: 'listagemCandidatos', component: CandidatoListagemComponent, 
  canActivate: [AuthGuardService]},
  { path: 'listagemExames', component: ExameListagemComponent,
  canActivate: [AuthGuardService] },
  { path: 'listagemIncricao', component: InscricaoListagemComponent,
  canActivate: [AuthGuardService] },
  { path : 'novoExame', component: ExameFormComponent,
  canActivate: [AuthGuardService] },
  { path : 'exames/:id', component: ExameFormComponent,
  canActivate: [AuthGuardService] },
  { path : 'candidatos/:id', component: CandidatoFormComponent,
  canActivate: [AuthGuardService] },
  { path : 'exameCandidato/:exame/:candidato', component: InscricaoFormComponent,
  canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
