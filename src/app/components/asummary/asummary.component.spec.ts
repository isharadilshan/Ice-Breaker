import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsummaryComponent } from './asummary.component';

describe('AsummaryComponent', () => {
  let component: AsummaryComponent;
  let fixture: ComponentFixture<AsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
