import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialLoginFormComponent } from './social-login-form.component';

describe('SocialLoginFormComponent', () => {
  let component: SocialLoginFormComponent;
  let fixture: ComponentFixture<SocialLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLoginFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should log message when authWithFacebook is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.authWithFacebook();
    expect(consoleSpy).toHaveBeenCalledWith('Logowanie przez Facebook - funkcjonalność do zaimplementowania');
  });

  it('should log message when authWithGoogle is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.authWithGoogle();
    expect(consoleSpy).toHaveBeenCalledWith('Logowanie przez Google - funkcjonalność do zaimplementowania');
  });
});
