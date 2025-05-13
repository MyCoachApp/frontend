import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsPageComponent } from './gyms-page.component';

describe('GymsPageComponent', () => {
  let component: GymsPageComponent;
  let fixture: ComponentFixture<GymsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
