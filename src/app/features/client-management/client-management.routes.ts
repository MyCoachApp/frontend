import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

export const CLIENT_MANAGEMENT_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: 'list', 
    pathMatch: 'full' 
  },
  { 
    path: 'list', 
    component: ClientListComponent 
  },
  { 
    path: 'details', 
    component: ClientDetailsComponent 
  },
  { 
    path: 'profile', 
    component: ClientProfileComponent 
  },
];