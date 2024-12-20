import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css'],

})
export class RoleSelectionComponent {
  constructor(private router: Router) {}

  selectRole(role: 'artist' | 'listener') {
    localStorage.setItem('userRole', role); // Store the role temporarily
    this.router.navigate(['/auth-choice']); // Redirect to the choice page
  }
}
