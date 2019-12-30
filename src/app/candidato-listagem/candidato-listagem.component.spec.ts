import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoListagemComponent } from './candidato-listagem.component';

describe('CandidatoListagemComponent', () => {
  let component: CandidatoListagemComponent;
  let fixture: ComponentFixture<CandidatoListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
