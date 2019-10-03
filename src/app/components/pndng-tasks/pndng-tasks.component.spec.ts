import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PndngTasksComponent } from './pndng-tasks.component';

describe('PndngTasksComponent', () => {
  let component: PndngTasksComponent;
  let fixture: ComponentFixture<PndngTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PndngTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PndngTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
