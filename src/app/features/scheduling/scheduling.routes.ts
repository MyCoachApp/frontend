import { Routes } from '@angular/router';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { RemindersComponent } from './reminders/reminders.component';
import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';

export const SCHEDULING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    component: CalendarViewComponent,
    title: 'Kalendarz'
  },
  {
    path: 'reminders',
    component: RemindersComponent,
    title: 'Przypomnienia'
  },
  {
    path: 'appointments',
    component: AppointmentSchedulerComponent,
    title: 'Terminarz'
  }
];
