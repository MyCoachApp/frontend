import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditComponent,
        HttpClientTestingModule,
        RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
