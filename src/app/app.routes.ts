import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';


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
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/user/routes/user.routes')
          .then(mod => mod.USER_PROFILE_ROUTES)
      },
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(mod => mod.AUTH_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
