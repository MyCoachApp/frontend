import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RegisterData } from '../models/register-data.interface';
import { RegisterResponse } from '../models/register-response.interface';
import { handleAuthError } from '../utils/auth-error.util';
import { AuthState } from '../models/auth-state.interface';
import { LoginCredentials } from '../models/login-credentials.interface';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  
  private readonly AUTH_STORAGE_KEY = 'auth_data';
  private authStateSubject = new BehaviorSubject<AuthState>(this.getInitialAuthState());

  public authState$ = this.authStateSubject.asObservable();

  private getInitialAuthState(): AuthState {
    if (!isBrowser()) {
      return {
        isAuthenticated: false,
        user: null,
        token: null
      };
    }

    const storedAuth = localStorage.getItem(this.AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth) as AuthState;
      } catch (e) {
        localStorage.removeItem(this.AUTH_STORAGE_KEY);
      }
    }

    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  }

  /**
   * Rejestracja użytkownika
   */
  register(data: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/register`, 
      data
    ).pipe(
      catchError(handleAuthError)
    );
  }

  /**
   * Logowanie użytkownika
   */
login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {
        this.storeAuthData(response);
        this.router.navigate(['/dashboard']);
      }),
      catchError(handleAuthError)
    );
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  /**
   * Wylogowywanie użytkownika
   */
  logout(): void {
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
    
    // Przekierowanie na stronę logowania po wylogowaniu
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  getCurrentUser() {
    return this.authStateSubject.value.user;
  }
  
  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/reset-password-request`, 
      { email }
    ).pipe(
      catchError(handleAuthError)
    );
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/reset-password`, 
      { token, newPassword }
    ).pipe(
      catchError(handleAuthError)
    );
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}