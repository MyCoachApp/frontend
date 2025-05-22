import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';
import { AuthService } from '../../services/auth.service';
import { RegistrationFormService } from '../../services/registration-form.service';
import { RegisterResponse } from '../../models/register-response.interface';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let registrationFormServiceSpy: jasmine.SpyObj<RegistrationFormService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    registrationFormServiceSpy = jasmine.createSpyObj('RegistrationFormService', ['createRegistrationForm', 'handleRegistrationError']);

    const formBuilder = new FormBuilder();
    const fakeForm = formBuilder.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      firstName: ['Test', Validators.required],
      lastName: ['User', Validators.required],
      password: ['StrongPass1!', Validators.required],
      confirmPassword: ['StrongPass1!', Validators.required],
      termsAccepted: [true, Validators.requiredTrue]
    });

    registrationFormServiceSpy.createRegistrationForm.and.returnValue(fakeForm);

    await TestBed.configureTestingModule({
      imports: [
        RegistrationFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: RegistrationFormService, useValue: registrationFormServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('togglePasswordVisibility', () => {
    it('should toggle passwordVisible when field is "password"', () => {
      expect(component.passwordVisible).toBeFalse();
      component.togglePasswordVisibility('password');
      expect(component.passwordVisible).toBeTrue();
    });

    it('should toggle confirmPasswordVisible when field is "confirmPassword"', () => {
      expect(component.confirmPasswordVisible).toBeFalse();
      component.togglePasswordVisibility('confirmPassword');
      expect(component.confirmPasswordVisible).toBeTrue();
    });
  });

  describe('f (form controls getter)', () => {
    it('should return the form controls', () => {
      const controls = component.f;
      expect(controls).toBe(component.registrationForm.controls);
      expect(controls['email']).toBeDefined();
    });
  });

  describe('onSubmit', () => {
    it('should call register and navigate on success', fakeAsync(() => {
      const mockResponse: RegisterResponse = {
        message: 'User created successfully',
        user: {
          email: 'test@example.com',
          isVerified: true
        }
      };

      authServiceSpy.register.and.returnValue(of(mockResponse));

      component.onSubmit();
      tick(); // simulate async

      expect(authServiceSpy.register).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {
        state: {
          registrationSuccess: true,
          email: 'test@example.com'
        }
      });
    }));

    it('should set errorMessage when registration fails', fakeAsync(() => {
      const fakeError = new Error('Registration failed');
      registrationFormServiceSpy.handleRegistrationError.and.returnValue('Custom error message');
      authServiceSpy.register.and.returnValue(throwError(() => fakeError));

      component.onSubmit();
      tick();

      expect(authServiceSpy.register).toHaveBeenCalled();
      expect(component.errorMessage).toBe('Custom error message');
    }));

    it('should not call register if form is invalid', () => {
      component.registrationForm.get('email')?.setValue('');
      component.registrationForm.updateValueAndValidity();

      expect(component.registrationForm.invalid).toBeTrue();
      component.onSubmit();

      expect(authServiceSpy.register).not.toHaveBeenCalled();
      expect(component.loading).toBeFalse();
    });
  });
});
