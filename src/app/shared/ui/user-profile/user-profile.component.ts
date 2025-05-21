import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../features/user/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  @Input() profile!: User;
  @Input() mode: 'view' | 'edit' = 'view';
  @Input() loading = false;
  @Input() error?: string;

  get isEdit(): boolean {
    return this.mode === 'edit';
  }

  getInitials(): string {
    const { firstName = '', lastName = '' } = this.profile || {};
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
  }

  onSave() {
    // Do implementacji później, np. emit lub serwis update
    console.log('Saving...', this.profile);
  }
}
