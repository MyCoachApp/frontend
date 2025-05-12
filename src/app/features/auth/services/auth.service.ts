import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RegisterData } from '../models/register-data.interface';
import { RegisterResponse } from '../models/register-response.interface';
import { handleAuthError } from '../utils/auth.error.util';
import { AuthState } from '../models/auth-state.interface';
import { LoginCredentials } from '../models/login-credentials.interface';
import { LoginResponse } from '../models/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
  
    private readonly AUTH_STORAGE_KEY = 'auth_data';
    private authStateSubject = new BehaviorSubject<AuthState>(this.getInitialAuthState());

    public authState$ = this.authStateSubject.asObservable();

    register(data: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/register`, 
      data
    ).pipe(
      catchError(handleAuthError)
    );
  }

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

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          const authState: AuthState = {
            isAuthenticated: true,
            user: response.user,
            token: response.token
          };
          
          this.authStateSubject.next(authState);
          localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(authState));
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
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
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
