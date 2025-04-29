import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-measurement-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.css']
})
export class MeasurementFormComponent implements OnInit {
  measurementForm: FormGroup;

  // Define valid units and types as per your backend schema
  units = ['kg', 'cm'];
  types = [
    'Biceps', 'Triceps', 'Forearm', 'Chest', 'Waist', 'Hips',
    'Quads', 'Calf', 'Shoulders', 'Back', 'Glutes', 'Abdomen',
    'Weight', 'Height'
  ];

  constructor(private fb: FormBuilder) {
    this.measurementForm = this.fb.group({
      date: ['', Validators.required], // Date input is required
      unit: ['', Validators.required], // Unit (kg/cm) is required
      value: [null, [Validators.required, Validators.min(0)]], // Value must be >= 0
      type: ['', Validators.required] // Type selection is required
    });
  }

  ngOnInit(): void {
    // On initialization, any pre-existing data would be populated here if necessary
  }

  // Submit handler
  onSubmit(): void {
    if (this.measurementForm.valid) {
      console.log('Measurement Data:', this.measurementForm.value);
      // Normally, here you would call a service to save the measurement
    } else {
      console.log('Form is invalid');
    }
  }
}
