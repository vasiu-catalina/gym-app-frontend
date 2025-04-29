import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-log',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.css']
})
export class WorkoutLogComponent {
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      id: [''], // generate workout id
      user: ['', Validators.required], // you may replace it dynamically
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required], // add date
      exercises: this.fb.array([this.createExercise()])
    });
  }

  createExercise(): FormGroup {
    return this.fb.group({
      id: [''], // generate exercise id
      name: ['', Validators.required],
      setNr: [1, [Validators.required, Validators.min(1)]],
      nrReps: [1, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addExercise(): void {
    this.exercises.push(this.createExercise());
  }

  removeExercise(index: number): void {
    this.exercises.removeAt(index);
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      console.log('Workout Log:', this.workoutForm.value);
      // send to backend
    } else {
      console.log('Form is invalid');
    }
  }

  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }
}
