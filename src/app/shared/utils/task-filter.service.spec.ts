import { TestBed } from '@angular/core/testing';

import { TaskFilterService } from './task-filter.service';

describe('TaskFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFilterService = TestBed.get(TaskFilterService);
    expect(service).toBeTruthy();
  });
});
