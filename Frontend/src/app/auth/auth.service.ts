import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Your backend auth URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .subscribe({
        next: (response) => {
          // Store token
          localStorage.setItem('token', response.token);
          // Redirect to protected route
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials');
        }
      });
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
