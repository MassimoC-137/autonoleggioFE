import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

interface ExtendedJwtPayload extends JwtPayload {
  id: number;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';
  private userRoleUrl = 'http://localhost:8080/api/auth/user-role';
  private _tokenStorage: any = null;
  router: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

   setTokenStorage(value: any) {
    if (isPlatformBrowser(this.platformId)) {
      this._tokenStorage = value;
      localStorage.setItem('authToken', this._tokenStorage);
    }
  }

   getTokenStorage(): any {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return this._tokenStorage;
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, data);
  }

  login(body: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, body).pipe(
      tap((result: any) => {
        this.setTokenStorage(result.jwt)
      })
    );
  }

  logout(): void {
    this._tokenStorage = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  isLoggedIn(): boolean {
    return this.getTokenStorage !== null;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Errore di autenticazione';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getUserName(): string | null {
    const token = this.getTokenStorage();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return this.capitalizeFirstLetter(decodedToken.nome);
    }
    return null;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getCurrentUser(): any {
    const token = this.getTokenStorage();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.currentUser;
    }
    return null;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  getUserRole(): Observable<JwtPayload | null> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getTokenStorage();
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return of(decodedToken);
      }
    }
    return of(null);
  }
}