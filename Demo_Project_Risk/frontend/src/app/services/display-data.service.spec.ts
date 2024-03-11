import { TestBed } from '@angular/core/testing';

import { DisplayDataService } from './display-data.service';

describe('DisplayDataService', () => {
  let service: DisplayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
