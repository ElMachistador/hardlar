import { TestBed } from '@angular/core/testing';

import { ContractInfosService } from './contract-infos.service';

describe('ContractInfosService', () => {
  let service: ContractInfosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractInfosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
