import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];