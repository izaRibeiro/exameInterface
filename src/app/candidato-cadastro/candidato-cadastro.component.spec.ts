import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoCadastroComponent } from './candidato-cadastro.component';

describe('CandidatoCadastroComponent', () => {
  let component: CandidatoCadastroComponent;
  let fixture: ComponentFixture<CandidatoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
