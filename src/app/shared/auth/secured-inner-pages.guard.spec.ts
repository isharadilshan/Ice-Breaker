import { TestBed, async, inject } from '@angular/core/testing';

import { SecuredInnerPagesGuard } from './secured-inner-pages.guard';

describe('SecuredInnerPagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecuredInnerPagesGuard]
    });
  });

  it('should ...', inject([SecuredInnerPagesGuard], (guard: SecuredInnerPagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
