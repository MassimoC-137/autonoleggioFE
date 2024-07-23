import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getTokenStorage();
    if (token) {
      const decodedToken = jwtDecode<ExtendedJwtPayload>(token);
      this.isAuthenticated = true;
      if (decodedToken.roles.includes('ROLE_ADMIN')) {
        this.isAdmin = true;
      }
    } else {
      console.error('No token found');
      this.isAuthenticated = false;
    }
  }
}