import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Measurement, MeasurementType } from '../../models/measurement.model';
import { MeasurementService } from '../../services/measurement.service';
import { AuthState } from '../../states/auth.state';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MeasurementState } from '../../states/measurement.state';

@Component({
  selector: 'app-measurement-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.css']
})
export class MeasurementformComponent implements OnInit {

  measurement: Measurement | null = null;
  measurementId = '';

  form!: FormGroup;
  userId = '';

  // Define valid units and types as per your backend schema
  units = ['kg', 'cm'];
  types = Object.values(MeasurementType);

  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private measurementService: MeasurementService,
    private measurementState: MeasurementState,
    private authState: AuthState,
  ) {

    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
      }
    })
  }

  ngOnInit(): void {

    this.measurementId = this.route.snapshot.paramMap.get('id') || '';

    if (this.measurementId) {
      this.measurement = this.measurementState.getMeasurementById(this.measurementId);
    }

    this.form = this.fb.group({
      date: [this.measurement?.date ? this.formatDateTime(this.measurement.date) : '', Validators.required], // Date input is required
      unit: [this.measurement?.unit || '', Validators.required], // Unit (kg/cm) is required
      value: [this.measurement?.value || 0, [Validators.required, Validators.min(0)]], // Value must be >= 0
      type: [this.measurement?.type || '', Validators.required] // Type selection is required
    });

  }


  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.measurement) {
      this.updateMeasurement();
    } else {
      this.addMeasurement();
    }

    console.log('Measurement Data:', this.form.value);
  }


  addMeasurement() {
    this.measurementService.createMeasurement(this.userId, this.form.value).subscribe({
      next: (res: Response) => {
        console.log(res);
        this.router.navigate(['/measurements']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  updateMeasurement() {
    this.measurementService.updateMeasurement(this.userId, this.measurement?.id || '', this.form.value).subscribe({
      next: (res: Response) => {
        console.log(res);
        this.router.navigate(['/measurements']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }


  private formatDateTime(date: Date | string): string {
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

}
