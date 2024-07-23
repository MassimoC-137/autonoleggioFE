import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatIconModule, 
    ReactiveFormsModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit() {
    console.log("validater", this.loginForm.valid);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response && response.jwt) {
            console.log("login", response);
            this.authService.setTokenStorage(response.jwt); // Usare solo il token jwt
            this.router.navigate(['home']);
          } else {
            console.error('Invalid login response:', response);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}