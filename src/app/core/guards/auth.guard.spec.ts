import { authGuard } from './auth.guard';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should return true if user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBeTrue();
  });

  it('should return UrlTree to /login if user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const urlTreeMock = {} as UrlTree;
    routerSpy.parseUrl.and.returnValue(urlTreeMock);

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(urlTreeMock);
  });
});
