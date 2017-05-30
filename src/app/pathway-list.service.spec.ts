import { TestBed, inject } from '@angular/core/testing';

import { PathwayListService } from './pathway-list.service';

describe('PathwayListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathwayListService]
    });
  });

  it('should ...', inject([PathwayListService], (service: PathwayListService) => {
    expect(service).toBeTruthy();
  }));
});
