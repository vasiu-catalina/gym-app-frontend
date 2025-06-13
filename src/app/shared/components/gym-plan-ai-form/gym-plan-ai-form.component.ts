import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FitnessLevel, Goal, GymPlanAiRequest, TrainingStyle, WorkoutType } from '../../models/gym-plan.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GymPlanService } from '../../services/gym-plan.service';
import { AuthState } from '../../states/auth.state';
import { GymPlanState } from '../../states/gym-plan.state';

@Component({
  selector: 'app-gym-plan-ai-form',
  templateUrl: './gym-plan-ai-form.component.html',
  styleUrls: ['./gym-plan-ai-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class GymPlanAiFormComponent implements OnInit {

  userId = '';
  aiForm!: FormGroup;
  isSubmitting = false;

  fitnessLevels = Object.values(FitnessLevel);
  goals = Object.values(Goal);
  workoutTypes = Object.values(WorkoutType);
  trainingStyles = Object.values(TrainingStyle);
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  muscleGroups = ['Chest', 'Back', 'Legs', 'Glutes', 'Arms', 'Shoulders', 'Core'];

  constructor(private fb: FormBuilder, private router: Router, private gymPlanService: GymPlanService, private authState: AuthState, private gymPlanState: GymPlanState) {

    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
      }
    })
  }

  ngOnInit(): void {
    this.aiForm = this.fb.group({
      height: [170, Validators.required],
      weight: [70, Validators.required],
      fitnessLevel: [null, Validators.required],
      injuriesOrConditions: [''],
      primaryGoal: [null, Validators.required],
      secondaryGoals: this.fb.array([]),
      workoutDaysPerWeek: [3, Validators.required],
      preferredWorkoutDurationMinutes: [45, Validators.required],
      availableDays: this.fb.array([]),
      preferredWorkoutType: [null, Validators.required],
      trainingStyle: [null, Validators.required],
      focusMuscleGroups: this.fb.array([]),
      exerciseRestrictions: [''],
      favoriteExercises: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });


  }

  onCheckboxChange(event: any, controlName: string) {
    const formArray: FormArray = this.aiForm.get(controlName) as FormArray;
    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }


  onSubmit() {
    if (this.aiForm.invalid) return;

    this.isSubmitting = true;
    const value: GymPlanAiRequest = this.aiForm.value;
    this.gymPlanService.generateGymPlan(this.userId, this.aiForm.value).subscribe({
      next: (res) => {
        this.gymPlanState.addGymPlan(res.gymPlan);
        this.isSubmitting = false;
        this.router.navigate(['/gym-plans']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      }
    })

  }
}
