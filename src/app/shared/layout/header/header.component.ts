import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgForOf } from '@angular/common';
import { IconUserComponent } from '../../../shared/ui/icon-user/icon-user.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, NgForOf, IconUserComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navLinks = [
    { path: '/trainers', label: 'Trenerzy' },
    { path: '/gyms', label: 'Siłownie' },
    { path: '/scheduling', label: 'Terminarz' },
    { path: '/progress-tracking', label: 'Progres' },
    { path: 'auth/login', label: 'Zaloguj się' },
  ];
}
