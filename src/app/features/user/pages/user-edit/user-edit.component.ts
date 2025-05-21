import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserProfileComponent } from '../../../../shared/ui/user-profile/user-profile.component';

@Component({
  selector: 'app-user-edit',
  imports: [NgIf, AsyncPipe, UserProfileComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  private userService = inject(UserService);
  profile$ = this.userService.getUserProfile();
}
