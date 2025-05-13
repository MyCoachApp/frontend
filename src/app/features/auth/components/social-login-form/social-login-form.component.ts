import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-login-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-login-form.component.html',
  styleUrls: ['./social-login-form.component.scss']
})
export class SocialLoginFormComponent {
  authWithFacebook(): void {
    console.log('Logowanie przez Facebook - funkcjonalność do zaimplementowania');
  }

  authWithGoogle(): void {
    console.log('Logowanie przez Google - funkcjonalność do zaimplementowania');
  }
}