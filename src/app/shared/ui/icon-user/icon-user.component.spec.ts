import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUserComponent } from './icon-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


describe('IconUserComponent', () => {
  let component: IconUserComponent;
  let fixture: ComponentFixture<IconUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUserComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
