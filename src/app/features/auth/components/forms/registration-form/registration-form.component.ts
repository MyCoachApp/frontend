import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { RegisterData } from '../../../models/register-data.interface';
import { RegisterResponse } from '../../../models/register-response.interface';
import { AuthService } from '../../../services/auth.service';
import { RegistrationFormService } from '../../../services/registration-form.service';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationFormComponent {
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