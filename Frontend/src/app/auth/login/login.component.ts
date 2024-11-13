import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userRole: string | null = localStorage.getItem('userRole');
  username = '';
  password = '';
  authentication_id = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password,
      userType: this.userRole,
      authentication_id: this.userRole === 'artist' ? this.authentication_id : null
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        alert(res.message);
        localStorage.setItem('authToken', res.token); // Save the token
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error: (err) => {
        alert('Login failed');
      }
    });
  }
}