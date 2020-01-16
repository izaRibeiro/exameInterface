import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameCadastroComponent } from './exame-cadastro.component';

describe('ExameCadastroComponent', () => {
  let component: ExameCadastroComponent;
  let fixture: ComponentFixture<ExameCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExameCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
