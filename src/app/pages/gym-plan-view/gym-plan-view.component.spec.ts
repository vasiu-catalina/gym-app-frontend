import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPlanViewComponent } from './gym-plan-view.component';

describe('GymPlanViewComponent', () => {
  let component: GymPlanViewComponent;
  let fixture: ComponentFixture<GymPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPlanViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
