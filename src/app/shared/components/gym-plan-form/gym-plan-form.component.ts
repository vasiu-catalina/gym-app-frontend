import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GymPlanService } from '../../services/gym-plan.service';
import { AuthState } from '../../states/auth.state';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GymPlan } from '../../models/gym-plan.model';
import { formatDateForInput } from '../../functions/formatDateForInput';

@Component({
  selector: 'app-gym-plan-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './gym-plan-form.component.html',
  styleUrls: ['./gym-plan-form.component.css']
})
export class GymPlanFormComponent {
  userId = '';
  isEditMode = false;
  gymPlan: GymPlan | null = null;
  planId: string | null = null;
  gymPlanForm !: FormGroup;

  constructor(private fb: FormBuilder, private gymPlanService: GymPlanService, private authState: AuthState,
    private router: Router, private route: ActivatedRoute
  ) {
    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.initForm();
      }
    })
  }

  initForm(): void {
    this.planId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.planId;
    this.gymPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nrWeeks: ['', [Validators.required, Validators.min(1)]],
      days: this.fb.array([])
    });

    if (this.isEditMode) {
      this.loadPlan();
    } else {
      this.addDay();
    }
  }

  loadPlan() {
    this.gymPlanService.getGymPlan(this.userId, this.planId!).subscribe({
      next: (res) => {
        this.gymPlan = res.gymPlan;
        this.patchForm(this.gymPlan!);
      },
      error: (err) => {
        console.error('Failed to load plan', err);
      }
    });
  }

  patchForm(plan: GymPlan) {
    this.gymPlanForm.patchValue({
      name: plan.name,
      description: plan.description,
      startDate: formatDateForInput(plan.startDate),
      endDate: formatDateForInput(plan.endDate),
      nrWeeks: plan.nrWeeks
    });

    const dayFormGroups = plan.days.map(day =>
      this.fb.group({
        id: [day.id],
        name: [day.name, Validators.required],
        description: [day.description],
        exercises: this.fb.array(
          day.exercises.map(ex =>
            this.fb.group({
              id: [ex.id],
              name: [ex.name, Validators.required],
              nrSets: [ex.nrSets, [Validators.min(1)]],
              nrReps: [ex.nrReps, [Validators.min(1)]],
              duration: [ex.duration, [Validators.min(0)]]
            })
          )
        )
      })
    );

    const daysArray = this.gymPlanForm.get('days') as FormArray;
    dayFormGroups.forEach(group => daysArray.push(group));
  }

  get days(): FormArray {
    return this.gymPlanForm.get('days') as FormArray;
  }

  addDay(): void {
    const dayGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      exercises: this.fb.array([])
    });

    this.days.push(dayGroup);
  }

  removeDay(index: number): void {
    this.days.removeAt(index);
  }

  getExercises(dayIndex: number): FormArray {
    return this.days.at(dayIndex).get('exercises') as FormArray;
  }

  addExercise(dayIndex: number): void {
    const exerciseGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      nrSets: [1, [Validators.min(1)]],
      nrReps: [1, [Validators.min(1)]],
      duration: [0, [Validators.min(0)]]
    });

    this.getExercises(dayIndex).push(exerciseGroup);
  }

  removeExercise(dayIndex: number, exerciseIndex: number): void {
    this.getExercises(dayIndex).removeAt(exerciseIndex);
  }


  onSubmit(): void {
    if (this.gymPlanForm.valid) {
      const payload = this.gymPlanForm.value;

      const req$ = this.isEditMode
        ? this.gymPlanService.updateGymPlan(this.userId, this.planId!, payload)
        : this.gymPlanService.createGymPlan(this.userId, payload);

      req$.subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/gym-plans']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
