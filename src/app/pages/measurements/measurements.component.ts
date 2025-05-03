import { Component, effect, OnInit } from '@angular/core';
import { MeasurementService } from '../../shared/services/measurement.service';
import { MeasurementState } from '../../shared/states/measurement.state';
import { Measurement } from '../../shared/models/measurement.model';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';

@Component({
  selector: 'app-measurements',
  imports: [CommonModule, RouterModule],
  templateUrl: './measurements.component.html',
  styleUrl: './measurements.component.css'
})
export class MeasurementsComponent {

  measurements: Measurement[] = [];
  selectedMeasurementId: string = '';
  user: User | null = null;
  userId = '';

  constructor(private measurementService: MeasurementService,
    private measurementState: MeasurementState,
    private authState: AuthState
  ) {
    effect(() => {

      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.fetchMeasurements();
      }
    })

    effect(() => {
      this.measurements = this.measurementState.getMeasurements();
    })
  }


  confirmDelete() {
    this.deleteMeasurement(this.selectedMeasurementId);
    this.selectedMeasurementId = '';
  }

  cancelDelete() {
    this.selectedMeasurementId = '';
  }

  openDeleteModal(id: string) {
    this.selectedMeasurementId = id;
  }

  fetchMeasurements() {
    this.measurementService.getAllMeasurements(this.userId).subscribe({
      next: (res) => {
        this.measurementState.setMeasurements(res.measurements);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  deleteMeasurement(id: string) {
    if (!id) return;

    this.measurementService.deleteMeasurement(this.userId, id).subscribe({
      next: () => {
        this.measurements = this.measurements.filter(m => m.id !== id);
      },
      error: (err) => {
        console.error('Error deleting measurement:', err);
      }
    });
  }



}
