import { ExameFormComponent } from './../exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

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