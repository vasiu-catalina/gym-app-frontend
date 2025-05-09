import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLogFormComponent } from './workout-log-form.component';

describe('WorkoutLogFormComponent', () => {
  let component: WorkoutLogFormComponent;
  let fixture: ComponentFixture<WorkoutLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutLogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
