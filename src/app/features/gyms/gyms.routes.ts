import { Routes } from '@angular/router';
import { GymsPageComponent } from './gyms-page/gyms-page.component';

export const GYMS_ROUTES: Routes = [
  {
    path: '',
    component: GymsPageComponent,
    title: 'Siłownie'
  }
];
