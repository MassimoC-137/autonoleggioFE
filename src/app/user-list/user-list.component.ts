import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup } from '@angular/forms';
 import { MatTableDataSource, MatTableModule } from '@angular/material/table';
 import { MatButtonModule } from '@angular/material/button';
 import { MatIconModule } from '@angular/material/icon';
 import { CommonModule } from '@angular/common';
 import { Router, RouterLink, RouterModule } from '@angular/router';
 import { AuthService } from '../services/auth.service';
 import { UserService } from '../services/user.service';

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
   imports: [
     CommonModule,
     MatTableModule,
     MatButtonModule,
     MatIconModule,
     RouterModule, 
     RouterLink
   ],
   templateUrl: './user-list.component.html',
   styleUrls: ['./user-list.component.css']
 })
 export class UserListComponent implements OnInit {
   users: MatTableDataSource<User> = new MatTableDataSource();
   displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
   selectedUser: User | null = null;
   userForm: FormGroup;

   constructor(
     private userService: UserService,
     private fb: FormBuilder,
     private router: Router,
     private authService: AuthService
   ) {
     this.userForm = this.fb.group({
       id: [''],
       attivo: ['']
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

   addUser() {
     this.router.navigate(['/user-form']);
   }

   editUser(userId: number) {
     this.router.navigate(['/user-form', { id: userId }]);
   }

   deleteUser(userId: number) {
     this.userService.deleteUser(userId).subscribe(() => {
       this.users.data = this.users.data.filter(user => user.id !== userId);
     });
   }
 }