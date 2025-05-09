import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  
  userEmail: string = '';
  userRoles: string[] = [];
  
  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userEmail = user.email;
      this.userRoles = user.roles;
    }
  }
  
  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}