import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLogsComponent } from './workout-logs.component';

describe('WorkoutLogsComponent', () => {
  let component: WorkoutLogsComponent;
  let fixture: ComponentFixture<WorkoutLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
