import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtasksComponent } from './ptasks.component';

describe('PtasksComponent', () => {
  let component: PtasksComponent;
  let fixture: ComponentFixture<PtasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
