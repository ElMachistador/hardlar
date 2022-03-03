import { TestBed } from '@angular/core/testing';

import { TokenuriService } from './tokenuri.service';

describe('TokenuriService', () => {
  let service: TokenuriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenuriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
