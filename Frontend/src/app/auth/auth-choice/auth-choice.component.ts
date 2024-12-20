import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-choice',
  templateUrl: './auth-choice.component.html',
  styleUrls: ['./auth-choice.component.css']
})
export class AuthChoiceComponent {
  userRole: string | null = localStorage.getItem('userRole'); // Retrieve the role
  i = 0;

  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
