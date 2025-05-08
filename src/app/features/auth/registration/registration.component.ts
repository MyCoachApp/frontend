import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { RegistrationFormService } from '../services/registration-form.service';
import { RegisterResponse } from '../models/register-response.interface';
import { RegisterData } from '../models/register-data.interface';


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
    private registrationFormService: RegistrationFormService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.registrationFormService.createRegistrationForm();
  }

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
    
    const registrationData: RegisterData = {
      email: this.f['email'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value
    };
    
    this.authService.register(registrationData)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: RegisterResponse) => {
          const email = response?.user?.email || this.f['email'].value;
          this.router.navigate(['/login'], {
            state: { 
              registrationSuccess: true,
              email: email 
            }
          });
        },
        error: (error: unknown) => {
          this.errorMessage = this.registrationFormService.handleRegistrationError(error);
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
}