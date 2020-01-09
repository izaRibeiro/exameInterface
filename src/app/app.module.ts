
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';
import { CandidatoService} from './candidato.service';
import { ExameListagemComponent } from './exame-listagem/exame-listagem.component';
import { ExameService } from './exame.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatoFormComponent } from './candidato-form/candidato-form.component';
import { HeaderComponent } from './header/header.component';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { InscricaoListagemComponent } from './inscricao-listagem/inscricao-listagem.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CandidatoListagemComponent,
    ExameListagemComponent,
    CandidatoFormComponent,
    HeaderComponent,
    ExameFormComponent,
    InscricaoListagemComponent,
    InscricaoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ CandidatoService, ExameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
