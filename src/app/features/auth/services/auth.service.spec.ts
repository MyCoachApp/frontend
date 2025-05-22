import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { RegisterData } from '../models/register-data.interface';
import { LoginCredentials } from '../models/login-credentials.interface';
import { AuthResponse } from '../models/auth-response.interface';
import { RegisterResponse } from '../models/register-response.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#register', () => {
    it('should send POST to /register', () => {
      const mockData: RegisterData = {
        email: 'test@example.com',
        password: 'StrongPass1!',
        firstName: 'Test',
        lastName: 'User'
      };

        const mockResponse: RegisterResponse = {
        message: 'User created successfully',
        user: {
            email: 'test@example.com',
            isVerified: false
            }
        };


      service.register(mockData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockResponse);
    });
  });

  describe('#login', () => {
    it('should store auth data and navigate on success', () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'Password1!'
      };

        const mockResponse: AuthResponse = {
        token: 'mock-token',
        user: { id: 1, email: 'test@example.com' }
        };

      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);

      req.flush(mockResponse);

      expect(localStorage.getItem('auth_token')).toBe(mockResponse.token);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('#logout', () => {
    it('should clear auth data and redirect', () => {
      localStorage.setItem('auth_data', JSON.stringify({
        isAuthenticated: true,
        user: { id: 1 },
        token: 'token123'
      }));

      service.logout();

      expect(localStorage.getItem('auth_data')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });

  describe('#requestPasswordReset', () => {
    it('should send POST to /reset-password-request', () => {
      const email = 'reset@example.com';
      const mockResponse = { message: 'Reset link sent' };

      service.requestPasswordReset(email).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reset-password-request`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(mockResponse);
    });
  });

  describe('#resetPassword', () => {
    it('should send POST to /reset-password', () => {
      const token = 'reset-token';
      const newPassword = 'NewPass123!';
      const mockResponse = { message: 'Password updated' };

      service.resetPassword(token, newPassword).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ token, newPassword });
      req.flush(mockResponse);
    });
  });

  describe('#isAuthenticated', () => {
    it('should return false initially', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('#getToken', () => {
    it('should return null initially', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('#getCurrentUser', () => {
    it('should return null initially', () => {
      expect(service.getCurrentUser()).toBeNull();
    });
  });
});
