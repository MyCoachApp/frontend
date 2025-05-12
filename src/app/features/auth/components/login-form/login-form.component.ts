import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  isLoading = false;
  errorMessage = '';
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          if (error.error && error.error.error) {
            this.errorMessage = error.error.error;
          } else if (error.error && error.error.errors) {
            this.errorMessage = Object.values(error.error.errors).join(', ');
          } else {
            this.errorMessage = 'Wystąpił błąd podczas logowania. Spróbuj ponownie.';
          }
        }
      });
  }
}