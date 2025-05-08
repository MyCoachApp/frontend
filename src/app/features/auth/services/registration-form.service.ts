import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {
  constructor(private formBuilder: FormBuilder) {}

  /**
   * Tworzy i zwraca formularz rejestracyjny z walidacją
   */
  createRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    }, {
      validators: [this.passwordMatchValidator()]
    });
  }

  /**
   * Przetwarza błędy rejestracji i zwraca odpowiedni komunikat
   * @param error - błąd rejestracji
   * @returns komunikat błędu do wyświetlenia użytkownikowi
   */
  handleRegistrationError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        return 'Konto z tym adresem email już istnieje';
      } else if (error.error?.message) {
        return error.error.message;
      } else if (typeof error.error === 'string') {
        return error.error;
      } else {
        return `Błąd podczas rejestracji (${error.status})`;
      }
    } else if (error?.message) {
      return error.message;
    } else {
      return 'Wystąpił nieoczekiwany błąd podczas rejestracji';
    }
  }

  /**
   * Walidator sprawdzający siłę hasła
   * Wymaga co najmniej jednej małej litery, jednej wielkiej litery,
   * jednej cyfry, jednego znaku specjalnego i długości minimum 8 znaków
   */
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const value = control.value;
      if (!value) return null;

      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return strongPassword.test(value) ? null : { weakPassword: true };
    };
  }

  /**
   * Walidator sprawdzający czy hasło i powtórzone hasło są identyczne
   */
  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}