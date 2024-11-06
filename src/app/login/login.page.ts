import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string | any;
  password: string | any;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
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
