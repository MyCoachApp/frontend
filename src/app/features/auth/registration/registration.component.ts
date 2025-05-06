import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterResponse } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string = '';
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
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

  // Getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.registrationForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const registrationData = {
      email: this.f['email'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value
    };
    
    this.authService.register(registrationData)
      .pipe(
        finalize(() => {
          this.loading = false;
          console.log('Finalize executed, loading set to false');
        })
      )
      .subscribe({
        next: (response: RegisterResponse) => {
          console.log('Rejestracja zakończona sukcesem:', response);
          
          const email = response?.user?.email || this.f['email'].value;
          localStorage.setItem('registration_email', email);
          
          // Sprawdzenie czy jesteśmy w kontekście auth
          const currentUrl = this.router.url;
          console.log('Current URL before navigation:', currentUrl);
          
          // Nawigacja do strony potwierdzenia
          this.router.navigate(['/auth/registration-success'], {
            state: { email: email }
          });
          
          console.log('Nawigacja wykonana do /auth/registration-success');
          
          // Dodatkowe zabezpieczenie - jeśli nawigacja nie zadziała, przekierujemy po 500ms
          setTimeout(() => {
            if (this.router.url === currentUrl) {
              console.log('Nawigacja nie zmieniła URL, próba użycia window.location');
              window.location.href = '/auth/registration-success';
            }
          }, 500);
        },
        error: (error: any) => {
          console.error('Błąd rejestracji:', error);
          
          // Lepsze pobieranie wiadomości błędu
          if (error instanceof HttpErrorResponse) {
            if (error.status === 409) {
              this.errorMessage = 'Konto z tym adresem email już istnieje';
            } else if (error.error?.message) {
              this.errorMessage = error.error.message;
            } else if (typeof error.error === 'string') {
              this.errorMessage = error.error;
            } else {
              this.errorMessage = `Błąd podczas rejestracji (${error.status})`;
            }
          } else if (error?.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'Wystąpił nieoczekiwany błąd podczas rejestracji';
          }
        }
      });
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return strongPassword.test(value) ? null : { weakPassword: true };
    };
  }

  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}