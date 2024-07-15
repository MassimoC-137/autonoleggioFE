import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confermaPassword: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataConseguimentoPatente: ['', Validators.required],
      creditoDisponibile: ['', [Validators.required, Validators.min(0)]],
      attivo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId) {
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
          this.router.navigate(['/user-list']);
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe(() => {
          this.router.navigate(['/user-list']);
        });
      }
    }
  }

  clearSelection(): void {
    this.userForm.reset();
  }
}