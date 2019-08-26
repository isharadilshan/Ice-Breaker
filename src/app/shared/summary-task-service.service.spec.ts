import { TestBed } from '@angular/core/testing';

import { SummaryTaskServiceService } from './summary-task-service.service';

describe('SummaryTaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryTaskServiceService = TestBed.get(SummaryTaskServiceService);
    expect(service).toBeTruthy();
  });
});
