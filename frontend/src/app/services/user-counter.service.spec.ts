import { TestBed, inject } from '@angular/core/testing';

import { UserCounterService } from './user-counter.service';

describe('UserCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCounterService]
    });
  });

  it('should be created', inject([UserCounterService], (service: UserCounterService) => {
    expect(service).toBeTruthy();
  }));
});
