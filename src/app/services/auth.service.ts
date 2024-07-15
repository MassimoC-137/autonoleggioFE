import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/utente`, data);
  }

  getUserRole(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-role`);
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authUser');
    }
  }
  
}