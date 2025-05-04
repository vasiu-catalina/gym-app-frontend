import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPlanAiFormComponent } from './gym-plan-ai-form.component';

describe('GymPlanAiFormComponent', () => {
  let component: GymPlanAiFormComponent;
  let fixture: ComponentFixture<GymPlanAiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPlanAiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymPlanAiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
