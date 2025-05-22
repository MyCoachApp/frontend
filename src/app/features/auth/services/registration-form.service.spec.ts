import { TestBed } from '@angular/core/testing';
import { RegistrationFormService } from './registration-form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

describe('RegistrationFormService', () => {
  let service: RegistrationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationFormService, FormBuilder]
    });
    service = TestBed.inject(RegistrationFormService);
  });

  describe('handleRegistrationError', () => {
    it('should return conflict message for 409 status', () => {
      const error = new HttpErrorResponse({
        status: 409,
        error: {}
      });
      expect(service.handleRegistrationError(error)).toBe('Konto z tym adresem email już istnieje');
    });

    it('should return serverError string directly if it is a string', () => {
      const error = new HttpErrorResponse({
        status: 400,
        error: 'Nieprawidłowe dane'
      });
      expect(service.handleRegistrationError(error)).toBe('Nieprawidłowe dane');
    });

    it('should return message from serverError object', () => {
      const error = new HttpErrorResponse({
        status: 400,
        error: { message: 'Błąd walidacji' }
      });
      expect(service.handleRegistrationError(error)).toBe('Błąd walidacji');
    });

    it('should return generic message with status if no message found', () => {
      const error = new HttpErrorResponse({
        status: 500,
        error: {}
      });
      expect(service.handleRegistrationError(error)).toBe('Błąd podczas rejestracji (500)');
    });

    it('should return message from plain object with message', () => {
      const error = { message: 'Nieznany błąd' };
      expect(service.handleRegistrationError(error)).toBe('Nieznany błąd');
    });

    it('should return fallback message for unknown error shape', () => {
      const error = 'some random error';
      expect(service.handleRegistrationError(error)).toBe('Wystąpił nieoczekiwany błąd podczas rejestracji');
    });
  });

  describe('createRegistrationForm', () => {
    it('should create a form with expected controls', () => {
      const form = service.createRegistrationForm();
      expect(form instanceof FormGroup).toBeTrue();
      expect(form.contains('email')).toBeTrue();
      expect(form.contains('firstName')).toBeTrue();
      expect(form.contains('lastName')).toBeTrue();
      expect(form.contains('password')).toBeTrue();
      expect(form.contains('confirmPassword')).toBeTrue();
      expect(form.contains('termsAccepted')).toBeTrue();
    });
  });

  describe('passwordStrengthValidator', () => {
    it('should return null for strong password', () => {
      const control = { value: 'StrongPass1!' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toBeNull(); // walidator akceptuje
    });

    it('should return error object for weak password - too short', () => {
      const control = { value: 'S1!' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toEqual({ weakPassword: true });
    });

    it('should return error object for weak password - missing uppercase', () => {
      const control = { value: 'strongpass1!' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toEqual({ weakPassword: true });
    });

    it('should return error object for weak password - missing digit', () => {
      const control = { value: 'StrongPass!' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toEqual({ weakPassword: true });
    });

    it('should return error object for weak password - missing special character', () => {
      const control = { value: 'StrongPass1' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toEqual({ weakPassword: true });
    });

    it('should return null if value is empty', () => {
      const control = { value: '' } as AbstractControl;
      const result = service.passwordStrengthValidator()(control);
      expect(result).toBeNull();
    });
  });
  describe('passwordMatchValidator', () => {
    it('should return null if passwords match', () => {
      const group = {
        get: (field: string) => ({ value: field === 'password' ? 'Password123!' : 'Password123!' })
      } as unknown as AbstractControl;

      const result = service.passwordMatchValidator()(group);
      expect(result).toBeNull();
    });

    it('should return error object if passwords do not match', () => {
      const group = {
        get: (field: string) => ({ value: field === 'password' ? 'Password123!' : 'Different123!' })
      } as unknown as AbstractControl;

      const result = service.passwordMatchValidator()(group);
      expect(result).toEqual({ passwordMismatch: true });
    });
  });
});
