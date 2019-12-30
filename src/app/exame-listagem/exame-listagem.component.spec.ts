import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameListagemComponent } from './exame-listagem.component';

describe('ExameListagemComponent', () => {
  let component: ExameListagemComponent;
  let fixture: ComponentFixture<ExameListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExameListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
