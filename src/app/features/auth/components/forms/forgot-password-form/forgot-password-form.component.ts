import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isLoading = false;
  isSubmitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter dla łatwiejszego dostępu do pól formularza
  get email() { return this.forgotPasswordForm.get('email'); }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Symulacja wysyłania żądania resetowania hasła
    setTimeout(() => {
      // Tu powinna być faktyczna implementacja z serwisem
      this.isLoading = false;
      this.successMessage = 'Instrukcje resetowania hasła zostały wysłane na podany adres email.';
      
      // Opcjonalnie: zresetuj formularz po udanym wysłaniu
      this.forgotPasswordForm.reset();
      this.isSubmitted = false;
    }, 1500);
  }
}