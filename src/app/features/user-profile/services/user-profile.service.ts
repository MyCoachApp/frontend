import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // Dla demonstracji używamy danych mockowych
  // W rzeczywistej aplikacji pobieralibyśmy te dane z backendu
  private mockProfile: UserProfile = {
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

  /**
   * Pobierz profil aktualnie zalogowanego użytkownika
   */
  getUserProfile(): Observable<UserProfile> {
    // W rzeczywistej aplikacji użylibyśmy:
    // return this.http.get<UserProfile>('api/user-profile');
    
    // Dla demonstracji zwracamy dane mockowe
    return of(this.mockProfile);
  }
}