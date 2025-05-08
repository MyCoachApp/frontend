import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RegisterData } from '../models/register-data.interface';
import { RegisterResponse } from '../models/register-response.interface';
import { handleAuthError } from '../utils/auth.error.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/register`, 
      data
    ).pipe(
      catchError(handleAuthError)
    );
  }
}