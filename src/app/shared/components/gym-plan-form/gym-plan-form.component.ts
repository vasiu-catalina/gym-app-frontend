import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gym-plan-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gym-plan-form.component.html',
  styleUrls: ['./gym-plan-form.component.css']
})
export class GymPlanFormComponent implements OnInit {
  gymPlanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gymPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nrWeeks: ['', [Validators.required, Validators.min(1)]],
      days: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addDay();
  }

  get days(): FormArray {
    return this.gymPlanForm.get('days') as FormArray;
  }

  addDay(): void {
    const dayGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
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
      nrSets: [1, [Validators.required, Validators.min(1)]],
      nrReps: [1, [Validators.required, Validators.min(1)]],
      duration: [0, Validators.required]
    });

    this.getExercises(dayIndex).push(exerciseGroup);
  }

  removeExercise(dayIndex: number, exerciseIndex: number): void {
    this.getExercises(dayIndex).removeAt(exerciseIndex);
  }

  onSubmit(): void {
    if (this.gymPlanForm.valid) {
      console.log('Gym Plan:', this.gymPlanForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
