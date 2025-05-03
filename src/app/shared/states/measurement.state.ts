import { Injectable, signal } from '@angular/core';
import { Measurement } from '../models/measurement.model';

@Injectable({ providedIn: 'root' })
export class MeasurementState {
  private _measurements = signal<Measurement[]>([]);

  setMeasurements(measurements: Measurement[]) {
    this._measurements.set(measurements);
  }

  getMeasurements(): Measurement[] {
    return this._measurements();
  }

  clearMeasurements() {
    this._measurements.set([]);
  }

  getMeasurementById(id: string): Measurement | null {
    return this._measurements().find(m => m.id === id) || null;
  }

  getMeasurementsByType(type: string): Measurement[] {
    if (type === 'all') return this._measurements();
    return this._measurements().filter(m => m.type === type);
  }

}
