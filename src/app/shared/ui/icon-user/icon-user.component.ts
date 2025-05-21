import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-icon-user',
  templateUrl: './icon-user.component.html',
  styleUrls: ['./icon-user.component.scss']
})
export class IconUserComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authSubscription = this.authService.authState$.subscribe(state => {
      this.isLoggedIn = state.isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  goToProfile(): void {
    // if (this.isLoggedIn) {
      console.log('Użytkownik zalogowany - przechodzę do profilu');
      this.router.navigate(['/profile']);
    // } else {
      // console.log('Użytkownik niezalogowany - przechodzę do strony logowania');
      // this.router.navigate(['/auth/login']);
    }
}