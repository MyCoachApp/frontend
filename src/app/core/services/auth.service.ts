import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    id?: number;
    firstName?: string;
    lastName?: string;
  };
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    roles: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  register(data: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/register`, 
      data
    ).pipe(
      catchError(this.handleError)
    );
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => this.storeAuthData(response)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userData', JSON.stringify(response.user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Wystąpił nieznany błąd';
    
    if (error.error instanceof ErrorEvent) {
      // Błąd po stronie klienta
      errorMessage = `Błąd: ${error.error.message}`;
    } else {
      // Błąd zwrócony przez serwer
      if (error.status === 400 && error.error?.violations) {
        const violations = error.error.violations;
        errorMessage = Object.values(violations).join(', ');
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Kod błędu: ${error.status}, Wiadomość: ${error.message}`;
      }
    }
    
    // Zwracamy obiekt błędu zgodny z tym, co oczekuje komponent
    return throwError(() => new HttpErrorResponse({
      error: { message: errorMessage },
      status: error.status || 500,
      statusText: error.statusText
    }));
  }
}