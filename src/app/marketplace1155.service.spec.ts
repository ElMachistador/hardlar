import { TestBed } from '@angular/core/testing';

import { Marketplace1155Service } from './marketplace1155.service';

describe('Marketplace1155Service', () => {
  let service: Marketplace1155Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Marketplace1155Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
