import { TestBed } from '@angular/core/testing';

import { AllpostsService } from './allposts.service';

describe('AllpostsService', () => {
  let service: AllpostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllpostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
