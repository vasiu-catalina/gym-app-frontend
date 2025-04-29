import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPlanFormComponent } from './gym-plan-form.component';

describe('GymPlanFormComponent', () => {
  let component: GymPlanFormComponent;
  let fixture: ComponentFixture<GymPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPlanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
