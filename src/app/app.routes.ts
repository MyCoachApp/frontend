import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';


export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent, title: 'Strona główna' },
      {
        path: 'trainers',
        loadChildren: () => import('./features/trainers/trainers.routes')
          .then(mod => mod.TRAINERS_ROUTES)
      },
      {
        path: 'gyms',
        loadChildren: () => import('./features/gyms/gyms.routes')
          .then(mod => mod.GYMS_ROUTES)
      },
      {
        path: 'client-management',
        loadChildren: () => import('./features/client-management/client-management.routes')
          .then(mod => mod.CLIENT_MANAGEMENT_ROUTES),
        // canActivate: [AuthGuard] // dodaj później
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes')
          .then(mod => mod.DASHBOARD_ROUTES)
      },
      {
        path: 'scheduling',
        loadChildren: () => import('./features/scheduling/scheduling.routes')
          .then(mod => mod.SCHEDULING_ROUTES)
      },
      {
        path: 'progress-tracking',
        loadChildren: () => import('./features/progress-tracking/progress-tracking.routes')
          .then(mod => mod.PROGRESS_TRACKING_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(mod => mod.AUTH_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
