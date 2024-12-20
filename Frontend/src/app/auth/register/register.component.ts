import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;

  userRole: string | null = localStorage.getItem('userRole');
  userName: String = '';
  email: String = '';
  password: String = '';
  country: String = '';
  style : String = ''; // Only for artists
  authentication_id : String = ''; //Only for artists
  passwordFieldType: string = 'password';

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

    if(this.userName == null || this.email == null || this.password == null || this.country == null || (this.authentication_id == null && this.userRole == 'artist')) {
      alert('Registration failed');
    }

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

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}