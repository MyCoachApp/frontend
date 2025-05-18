import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  loginError: string | null = null; // Dodane dla obsługi błędów logowania

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = null; // Resetowanie błędu przy nowej próbie logowania

    setTimeout(() => {
      console.log('Dane logowania:', this.loginForm.value);
      
      this.isLoading = false;
    }, 1500);
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/invalid-credentials': 'Nieprawidłowy email lub hasło.',
      'auth/user-disabled': 'Twoje konto jest zablokowane. Skontaktuj się z administratorem.',
      'auth/too-many-requests': 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.',
      'default': 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.'
    };
    
    return errorMessages[errorCode] || errorMessages['default'];
  }
}