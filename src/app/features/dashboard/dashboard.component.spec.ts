import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }  // Dodajemy mock Routera
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should set userEmail and userRoles when user exists', () => {
      const mockUser = { email: 'test@example.com', roles: ['admin', 'user'] };
      authServiceSpy.getCurrentUser.and.returnValue(mockUser);

      component.ngOnInit();

      expect(component.userEmail).toBe(mockUser.email);
      expect(component.userRoles).toEqual(mockUser.roles);
    });

    it('should not set userEmail and userRoles when user is null', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);

      component.ngOnInit();

      expect(component.userEmail).toBe('');
      expect(component.userRoles).toEqual([]);
    });
  });

  describe('logout', () => {
    it('should call authService.logout and navigate to /login', () => {
      component.logout();

      expect(authServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
