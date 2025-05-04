import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPlansComponent } from './gym-plans.component';

describe('GymPlansComponent', () => {
  let component: GymPlansComponent;
  let fixture: ComponentFixture<GymPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
