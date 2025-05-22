import { Routes } from "@angular/router";
import { UserEditComponent } from "../pages/user-edit/user-edit.component";
import { UserMetricsComponent } from "../pages/user-metrics/user-metrics.component";
import { UserSettingsComponent } from "../pages/user-settings/user-settings.component";
import { UserViewComponent } from "../pages/user-view/user-view.component";

export const USER_PROFILE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserViewComponent,
        title: 'Mój profil'
      },
      {
        path: 'edit',
        component: UserEditComponent,
        title: 'Edycja profilu'
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        title: 'Ustawienia profilu'
      },
      {
        path: 'metrics',
        component: UserMetricsComponent,
        title: 'Moje pomiary'
      }
    ]
  }
];