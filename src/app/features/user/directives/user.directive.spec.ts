import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDirective } from './user.directive';

@Component({
  template: `<div [appUserMode]="mode" appUser></div>`,
  standalone: true,
  imports: [UserDirective]
})
class TestHostComponent {
  mode: 'view' | 'edit' = 'view';
}

describe('UserDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let directiveInstance: UserDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDirective, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    // Pobieramy instancję dyrektywy z elementu DOM
    const debugEl = fixture.debugElement.query(
      el => !!el.injector.get(UserDirective, null)
    );
    directiveInstance = debugEl.injector.get(UserDirective);
  });

  it('should set isViewMode = true and isEditMode = false when mode is "view"', () => {
    hostComponent.mode = 'view';
    fixture.detectChanges();

    expect(directiveInstance.isViewMode).toBeTrue();
    expect(directiveInstance.isEditMode).toBeFalse();
  });

  it('should set isEditMode = true and isViewMode = false when mode is "edit"', () => {
    hostComponent.mode = 'edit';
    fixture.detectChanges();

    expect(directiveInstance.isEditMode).toBeTrue();
    expect(directiveInstance.isViewMode).toBeFalse();
  });
});
