import { TestBed, inject } from '@angular/core/testing';

import { PathwayService } from './pathway.service';

describe('PathwayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathwayService]
    });
  });

  it('should ...', inject([PathwayService], (service: PathwayService) => {
    expect(service).toBeTruthy();
  }));
});
