import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../../features/auth/services/auth.service';
import { HttpRequest, HttpHandlerFn, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('authInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('should add Authorization header if token is present', () => {
    authServiceSpy.getToken.and.returnValue('mock-token');

    const req = new HttpRequest('GET', '/api/data', {
      headers: new HttpHeaders()
    });

    const handler: HttpHandlerFn = (modifiedReq) => {
      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer mock-token');
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, handler).subscribe();
    });
  });

  it('should not modify request if token is not present', () => {
    authServiceSpy.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/api/data', {
      headers: new HttpHeaders()
    });

    const handler: HttpHandlerFn = (modifiedReq) => {
      expect(modifiedReq.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    };

    TestBed.runInInjectionContext(() => {
      authInterceptor(req, handler).subscribe();
    });
  });
});
