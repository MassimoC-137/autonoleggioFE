import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

interface Role {
  id: number; 
  codice: string;
}

interface User {
  attivo: boolean;
  id: number;
  cognome: string; 
  nome: string; 
  username: string;
  email: string;
  credito_disponibile: number;
  data_conseguimento_patente: Date; 
  password: string; 
  conferma_password: string; 
  role: Role;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatPaginatorModule,
    RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
  selectedUser: User | null = null;
  userForm: FormGroup;
  searchForm: FormGroup;
  private baseUrl = 'http://localhost:8080/api/utente';
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      id: [''],
      attivo: ['', Validators.required],
      cognome: ['', Validators.required],
      nome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      credito_disponibile: ['', Validators.required],
      data_conseguimento_patente: ['', Validators.required],
      password: ['', Validators.required],
      conferma_password: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users.data = data;
    });
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }

  clearSelection(): void {
    this.selectedUser = null;
    this.userForm.reset();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.selectedUser) {
        this.userService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.clearSelection();
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.clearSelection();
        });
      }
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  searchUsers(): void {
    const searchValue = this.searchForm.get('search')?.value;
    this.userService.searchUsers(searchValue).subscribe(data => {
      this.users.data = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCodice(ruoli: Role[]): string {
    if (ruoli && ruoli.length > 0) {
      return ruoli.map(ruolo => ruolo.codice).join(', ');
    }
    return 'No Role';
  }
}