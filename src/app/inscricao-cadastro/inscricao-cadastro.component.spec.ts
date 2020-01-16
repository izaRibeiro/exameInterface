import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoCadastroComponent } from './inscricao-cadastro.component';

describe('InscricaoCadastroComponent', () => {
  let component: InscricaoCadastroComponent;
  let fixture: ComponentFixture<InscricaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
