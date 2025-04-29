import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.url}/${userId}`);
  }

  updateUser(userId: string, userData: User): Observable<any> {
    return this.http.patch(`${this.url}/${userId}`, userData);
  }

  changePassword(userId: string, data: { password: string, newPassword: string }): Observable<any> {
    return this.http.put(`${this.url}/${userId}/change-password`, data);
  }
}
