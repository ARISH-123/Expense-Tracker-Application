import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
   private baseUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ jwt: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.jwt)));
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
