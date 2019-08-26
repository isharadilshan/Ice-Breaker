import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApendingComponent } from './apending.component';

describe('ApendingComponent', () => {
  let component: ApendingComponent;
  let fixture: ComponentFixture<ApendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
