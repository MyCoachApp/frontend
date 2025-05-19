import { Routes } from "@angular/router";
import { ProfileEditComponent } from "./components/profile-edit/user-edit.component";
import { ProfileMetricsComponent } from "./components/user-metrics/user-metrics.component";
import { ProfileSettingsComponent } from "./components/user-settings/user-settings.component";
import { ProfileViewComponent } from "./components/user-view/user-view.component";
import { AuthGuard } from "../auth/guards/auth.guard";

export const USER_PROFILE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileViewComponent,
        title: 'Mój profil'
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
        title: 'Edycja profilu'
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent,
        title: 'Ustawienia profilu'
      },
      {
        path: 'metrics',
        component: ProfileMetricsComponent,
        title: 'Moje pomiary'
      }
    ]
  }
];