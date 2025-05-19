import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    DatePipe
  ]
})
export class ProfileViewComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.error = null;

    this.userProfileService.getUserProfile()
      .pipe(
        finalize(() => this.loading = false),
        catchError(error => {
          this.error = 'Failed to load profile data. Please try again later.';
          console.error('Error loading profile:', error);
          return of(null);
        })
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  getInitials(): string {
    if (!this.profile) return '';
    
    const firstInitial = this.profile.firstName ? this.profile.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.profile.lastName ? this.profile.lastName.charAt(0).toUpperCase() : '';
    
    return firstInitial + lastInitial;
  }
}