import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
// import { LoginComponent } from './login/login.component'; // Odkomentuj gdy utworzysz komponent logowania

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'register', component: RegistrationComponent },
      { path: '', redirectTo: 'register', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }