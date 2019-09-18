import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PTasksComponent } from './p-tasks.component';

describe('PTasksComponent', () => {
  let component: PTasksComponent;
  let fixture: ComponentFixture<PTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
