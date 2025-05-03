import { Component, effect, OnInit } from '@angular/core';
import { MeasurementService } from '../../shared/services/measurement.service';
import { MeasurementState } from '../../shared/states/measurement.state';
import { Measurement, MeasurementType } from '../../shared/models/measurement.model';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurements',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './measurements.component.html',
  styleUrl: './measurements.component.css'
})
export class MeasurementsComponent {

  measurements: Measurement[] = [];              // full list from state
  filteredMeasurements: Measurement[] = [];      // what you display

  selectedMeasurementId: string = '';
  user: User | null = null;
  userId = '';

  selectedType: string = 'all';
  availableTypes: string[] = Object.values(MeasurementType);

  constructor(
    private measurementService: MeasurementService,
    private measurementState: MeasurementState,
    private authState: AuthState
  ) {
    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.fetchMeasurements();
      }
    });

    effect(() => {
      this.measurements = this.measurementState.getMeasurements();
      this.filterMeasurements(); // re-apply filter on new data
    });
  }

  filterMeasurements() {
    this.filteredMeasurements = this.measurementState.getMeasurementsByType(this.selectedType);
  }

  onTypeChange() {
    this.filterMeasurements();
  }

  openDeleteModal(id: string) {
    this.selectedMeasurementId = id;
  }

  confirmDelete() {
    this.deleteMeasurement(this.selectedMeasurementId);
    this.selectedMeasurementId = '';
  }

  cancelDelete() {
    this.selectedMeasurementId = '';
  }

  fetchMeasurements() {
    this.measurementService.getAllMeasurements(this.userId).subscribe({
      next: (res) => {
        this.measurementState.setMeasurements(res.measurements);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteMeasurement(id: string) {
    if (!id) return;

    this.measurementService.deleteMeasurement(this.userId, id).subscribe({
      next: () => {
        const updated = this.measurements.filter(m => m.id !== id);
        this.measurementState.setMeasurements(updated);
      },
      error: (err) => {
        console.error('Error deleting measurement:', err);
      }
    });
  }
}
