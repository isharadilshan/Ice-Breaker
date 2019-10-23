import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBuildsComponent } from './dashboard-builds.component';

describe('DashboardBuildsComponent', () => {
  let component: DashboardBuildsComponent;
  let fixture: ComponentFixture<DashboardBuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
