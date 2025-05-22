import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUserComponent } from './icon-user.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';

describe('IconUserComponent', () => {
  let component: IconUserComponent;
  let fixture: ComponentFixture<IconUserComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated'], { authState$: new Subject() });

    TestBed.configureTestingModule({
      imports: [IconUserComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(IconUserComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to /profile when goToProfile is called', () => {
    component.goToProfile();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
