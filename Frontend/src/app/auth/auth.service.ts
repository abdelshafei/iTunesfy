import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api'; // Your backend auth URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(credentials: { username?: string; password: string; userType?: string | null; authentication_id?: string | null }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Register method
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  // Logout method
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
