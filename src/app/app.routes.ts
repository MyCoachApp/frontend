import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page.component';

export const APP_ROUTES: Routes = [
  { 
    path: '', 
    component: LandingPageComponent,
    title: 'Strona główna' 
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(mod => mod.AUTH_ROUTES)
  },
  {
    path: 'client-management',
    loadChildren: () => import('./features/client-management/client-management.routes')
      .then(mod => mod.CLIENT_MANAGEMENT_ROUTES),
      // canActivate: [AuthGuard] dodać jak będzie logowanie
  },
  { path: '**', redirectTo: '/' }
];