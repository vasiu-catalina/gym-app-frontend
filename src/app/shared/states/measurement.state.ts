import { Injectable, signal } from '@angular/core';
import { Measurement } from '../models/measurement.model';

@Injectable({ providedIn: 'root' })
export class MeasurementState {
  private _measurement = signal<Measurement | null>(null);

  setMeasurement(measurement: Measurement) {
    this._measurement.set(measurement);
  }

  getMeasurement(): Measurement | null {
    return this._measurement();
  }

  clearMeasurement() {
    this._measurement.set(null);
  }
}
