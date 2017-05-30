import { TestBed, inject } from '@angular/core/testing';

import { CompoundService } from './compound.service';

describe('CompoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompoundService]
    });
  });

  it('should be created', inject([CompoundService], (service: CompoundService) => {
    expect(service).toBeTruthy();
  }));
});
