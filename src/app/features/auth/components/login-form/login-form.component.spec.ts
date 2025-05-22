import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not submit the form if it is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' }); // invalid
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call authService.login and handle success', () => {
    const mockCredentials = { email: 'test@example.com', password: 'secret123' };
    const mockResponse = {
      token: 'xyz',
      user: {
        id: 1,
        email: 'test@example.com'
      }
    };

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue(mockCredentials);
    component.onSubmit();

    expect(component.isLoading).toBeFalse();
    expect(authServiceSpy.login).toHaveBeenCalledWith(mockCredentials);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage if login fails', () => {
    const mockCredentials = { email: 'test@example.com', password: 'secret123' };
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    component.loginForm.setValue(mockCredentials);
    component.onSubmit();

    expect(component.isLoading).toBeFalse();
    expect(authServiceSpy.login).toHaveBeenCalledWith(mockCredentials);
    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should set default error message if error has no message', () => {
    const mockCredentials = { email: 'test@example.com', password: 'secret123' };
    authServiceSpy.login.and.returnValue(throwError(() => ({})));

    component.loginForm.setValue(mockCredentials);
    component.onSubmit();

    expect(component.errorMessage).toBe('Wystąpił błąd podczas logowania');
  });
});
