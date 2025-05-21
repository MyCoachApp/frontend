import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockProfile: User = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    location: 'Warszawa, Polska',
    height: 180,
    weight: 75,
    bio: 'Entuzjasta fitnessu i zdrowego stylu życia.',
    joinDate: '2023-06-01'
  };

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return of(this.mockProfile);
  }
}