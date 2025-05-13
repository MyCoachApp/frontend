import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RegistrationFormComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
