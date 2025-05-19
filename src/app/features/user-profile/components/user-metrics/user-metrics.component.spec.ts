import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMetricsComponent } from './user-metrics.component';

describe('ProfileMetricsComponent', () => {
  let component: ProfileMetricsComponent;
  let fixture: ComponentFixture<ProfileMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
