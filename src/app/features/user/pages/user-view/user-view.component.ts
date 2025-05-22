import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfileComponent } from "../../../../shared/ui/user-profile/user-profile.component";
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  standalone: true,
  imports: [
    UserProfileComponent,
    NgIf, 
    AsyncPipe
]
})
export class UserViewComponent {

  private userService = inject(UserService);
  profile$ = this.userService.getUserProfile();

}