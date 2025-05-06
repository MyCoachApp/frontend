import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

export const AUTH_ROUTES: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];