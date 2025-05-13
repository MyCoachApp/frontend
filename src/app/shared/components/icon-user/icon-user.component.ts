import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-icon-user',
  templateUrl: './icon-user.component.html',
  styleUrls: ['./icon-user.component.scss']
})
export class IconUserComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  goToProfile(): void {
    console.log('Przechodzenie do profilu użytkownika');
    this.router.navigate(['/auth']);
  }
}
