import { TestBed } from '@angular/core/testing';

import { ArraySplitterService } from './array-splitter.service';

describe('ArraySplitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArraySplitterService = TestBed.get(ArraySplitterService);
    expect(service).toBeTruthy();
  });
});
