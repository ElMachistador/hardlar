import { TestBed } from '@angular/core/testing';

import { HalpService } from './halp.service';

describe('HalpService', () => {
  let service: HalpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HalpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
