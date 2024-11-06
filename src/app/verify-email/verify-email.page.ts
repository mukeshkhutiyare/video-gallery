import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  resendVerificationEmail() {
    this.authService.sendEmailVerification();
  }

  ngOnInit() {
  }

  async verify() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user.user?.emailVerified) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/verify-email']);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

}
