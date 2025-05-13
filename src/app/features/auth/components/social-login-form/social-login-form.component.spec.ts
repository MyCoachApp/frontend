import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginFormComponent } from './social-login.component';

describe('SocialLoginComponent', () => {
  let component: SocialLoginFormComponent;
  let fixture: ComponentFixture<SocialLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLoginFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
