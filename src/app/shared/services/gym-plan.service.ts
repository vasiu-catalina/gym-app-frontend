import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GymPlanService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  createGymPlan(userId: string, gymPlanData: any) {
    return this.http.post(`${this.url}/${userId}/gym-plans`, gymPlanData);
  }

  generateGymPlan(userId: string, data: any) {
    return this.http.post(`${this.url}/${userId}/gym-plans/generate`, data);
  }

  getUsersGymPlans(userId: string) {
    return this.http.get(`${this.url}/${userId}/gym-plans`);
  }

  getGymPlan(userId: string, planId: string) {
    return this.http.get(`${this.url}/${userId}/gym-plans/${planId}`);
  }

  updateGymPlan(userId: string, planId: string, data: any) {
    return this.http.put(`${this.url}/${userId}/gym-plans/${planId}`, data);
  }

  deleteGymPlan(userId: string, planId: string) {
    return this.http.delete(`${this.url}/${userId}/gym-plans/${planId}`);
  }
}
