import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  createMeasurement(userId: string, measurementData: any): Observable<any> {
    return this.http.post(`${this.url}/${userId}/measurements`, measurementData);
  }

  getAllMeasurements(userId: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}/measurements`);
  }

  getMeasurementsByDate(userId: string, date: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}/measurements/date/${date}`);
  }

  getMeasurementsByType(userId: string, type: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}/measurements/type/${type}`);
  }

  updateMeasurement(userId: string, measurementId: string, updatedData: Measurement): Observable<any> {
    return this.http.patch(`${this.url}/${userId}/measurements/${measurementId}`, updatedData);
  }

  deleteMeasurement(userId: string, measurementId: string): Observable<any> {
    return this.http.delete(`${this.url}/${userId}/measurements/${measurementId}`);
  }
}
