import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { CandidatoFormComponent } from './candidato-form/candidato-form.component';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';
import { CandidatoService } from './candidato.service';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListagemComponent } from './exame-listagem/exame-listagem.component';
import { ExameService } from './exame.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { InscricaoListagemComponent } from './inscricao-listagem/inscricao-listagem.component';
import { LoginComponent } from './login/login.component';




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
