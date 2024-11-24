import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  userRole: string | null = localStorage.getItem('userRole');
  username = '';
  passWord = '';
  authentication_id = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.passWord,
      userType: localStorage.getItem("userRole"),
      authentication_id: localStorage.getItem("userRole") === 'artist' ? this.authentication_id : null
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        alert(res.message);
        localStorage.setItem('authToken', res.token); // Save the token
        localStorage.setItem('username', this.username);
        // if artist store authID in localStorage
        if(localStorage.getItem("userRole") === 'artist') {
          localStorage.setItem("AuthId", this.authentication_id);
        } else {
          localStorage.removeItem('AuthId');
        }
        this.router.navigate(['/dashboard']); // Redirect to dashboard after login
      },
      error: (err) => {
        alert('Login failed');
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}