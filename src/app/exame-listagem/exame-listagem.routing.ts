import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExameFormComponent } from './../exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem.component';

export const routesExame: Routes = [
  { path : ' ', component: ExameListagemComponent },
  { path : 'novo', component: ExameFormComponent },
  { path : 'exames/:id', component: ExameFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routesExame)],
    exports: [RouterModule]
  })

  export class ExamesRoutingModule { }