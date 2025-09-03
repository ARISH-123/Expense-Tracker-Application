import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';

  private baseUrl = 'http://localhost:8080/api/auth/register'; // backend endpoint

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const payload = { username: this.username, email: this.email, password: this.password };
    this.http.post(this.baseUrl, payload).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.router.navigate(['/login']); // redirect to login
      },
      error: (err) => {
        this.message = 'Registration failed. Try again.';
        console.error(err);
      }
    });
  }
}
