import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { User } from '../../../features/user/models/user.model';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  describe('isEdit getter', () => {
    it('should return true when mode is "edit"', () => {
      component.mode = 'edit';
      expect(component.isEdit).toBeTrue();
    });

    it('should return false when mode is "view"', () => {
      component.mode = 'view';
      expect(component.isEdit).toBeFalse();
    });
  });

  describe('onSave', () => {
    it('should log the profile to console', () => {
      const testProfile: User = {
        id: 1,
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      component.profile = testProfile;
      const consoleSpy = spyOn(console, 'log');

      component.onSave();

      expect(consoleSpy).toHaveBeenCalledWith('Saving...', testProfile);
    });
  });
  describe('getInitials', () => {
    it('should return empty string if profile is not set', () => {
      component.profile = undefined;
      expect(component.getInitials()).toBe('');
    });

    it('should return empty string if firstName and lastName are missing', () => {
      component.profile = {} as User;
      expect(component.getInitials()).toBe('');
    });

    it('should return initials in uppercase', () => {
      component.profile = { firstName: 'Jan', lastName: 'Kowalski' } as User;
      expect(component.getInitials()).toBe('JK');
    });

    it('should handle missing firstName', () => {
      component.profile = { lastName: 'Nowak' } as User;
      expect(component.getInitials()).toBe('N');
    });

    it('should handle missing lastName', () => {
      component.profile = { firstName: 'Anna' } as User;
      expect(component.getInitials()).toBe('A');
    });
  });
});
