import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

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
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CandidatoListagemComponent,
    ExameListagemComponent,
    CandidatoFormComponent,
    HeaderComponent,
    ExameFormComponent,
    InscricaoListagemComponent,
    InscricaoFormComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [ CandidatoService, ExameService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
