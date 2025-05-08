import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  { path: '**', redirectTo: 'login' }
];