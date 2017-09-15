import { TestBed, inject } from '@angular/core/testing';

import { RunnerserviceService } from './runnerservice.service';

describe('RunnerserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunnerserviceService]
    });
  });

  it('should be created', inject([RunnerserviceService], (service: RunnerserviceService) => {
    expect(service).toBeTruthy();
  }));
});
