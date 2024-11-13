import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userRole: string | null = localStorage.getItem('userRole');
  userName = '';
  email = '';
  password = '';
  country = '';
  style = ''; // Only for artists
  authentication_id = '' //Only for artists

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const registerData = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      country: this.country,
      userType: this.userRole,
      style: this.userRole === 'artist' ? this.style : null,
      authentication_id: this.userRole === 'artist' ? this.authentication_id : null
    };

    this.authService.register(registerData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      error: (err) => {
        alert('Registration failed');
      }
    });
  }
}