import { TestBed } from '@angular/core/testing';

import { InscricaoService } from './inscricao.service';

describe('InscricaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscricaoService = TestBed.get(InscricaoService);
    expect(service).toBeTruthy();
  });
});
