import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confermaPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    dataConseguimentoPatente: new FormControl('', [Validators.required]),
    creditoDisponibile: new FormControl('', [Validators.required, Validators.min(0)])
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value)
        .subscribe(response => {
          this.router.navigate(['/login']);
        }, error => {
          console.error('Registration error', error);
        });
    }
  }
}