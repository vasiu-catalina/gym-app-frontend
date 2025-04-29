import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WorkoutLog } from '../models/workout-log.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutLogService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  createLog(userId: string, data: any) {
    return this.http.post(`${this.url}/${userId}/workout-logs`, data);
  }

  getLogs(userId: string) {
    return this.http.get(`${this.url}/${userId}/workout-logs`);
  }

  getLog(userId: string, logId: string) {
    return this.http.get(`${this.url}/${userId}/workout-logs/${logId}`);
  }

  updateLog(userId: string, logId: string, data: WorkoutLog) {
    return this.http.put(`${this.url}/${userId}/workout-logs/${logId}`, data);
  }

  deleteLog(userId: string, logId: string) {
    return this.http.delete(`${this.url}/${userId}/workout-logs/${logId}`);
  }
}
