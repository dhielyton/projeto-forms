import { TestBed } from '@angular/core/testing';

import { ConsultarCepService } from './consultar-cep.service';

describe('ConsultarCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarCepService = TestBed.get(ConsultarCepService);
    expect(service).toBeTruthy();
  });
});
