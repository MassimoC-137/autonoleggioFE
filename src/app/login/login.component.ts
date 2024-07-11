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
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }
}
