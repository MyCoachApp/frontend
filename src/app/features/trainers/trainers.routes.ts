import { Routes } from '@angular/router';
import { TrainersPageComponent } from './trainers-page/trainers-page.component';

export const TRAINERS_ROUTES: Routes = [
  {
    path: '',
    component: TrainersPageComponent,
    title: 'Trenerzy'
  }
];
