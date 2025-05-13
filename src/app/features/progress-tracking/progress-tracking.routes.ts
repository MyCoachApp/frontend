import { Routes } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { ReportsComponent } from './reports/reports.component';

export const PROGRESS_TRACKING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: ProgressDashboardComponent,
    title: 'Progres'
  },
  {
    path: 'reports',
    component: ReportsComponent,
    title: 'Raporty'
  }
];
