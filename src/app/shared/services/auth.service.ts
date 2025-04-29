import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api}/auth`;

  constructor(private http: HttpClient) { }

  register(userData: User): Observable<any> {
    return this.http.post(`${this.url}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials);
  }
}
