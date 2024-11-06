import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  phoneNumber!: string;
  verificationCode!: string;
  verificationId!: string;
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Initialize reCAPTCHA verifier when the component is initialized
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // this.sendVerificationCode();
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      }
    });
  }

  async googleProvider() {
    try {
      const confirmationResult = new firebase.auth.EmailAuthProvider();
    } catch (error) {
      console.error('Error during sending verification code:', error);
    }
  }


  async sendVerificationCode() {
    try {
      const confirmationResult = await this.authService.sendVerificationCode(this.phoneNumber, this.recaptchaVerifier);
      this.verificationId = confirmationResult.verificationId;
    } catch (error) {
      console.error('Error during sending verification code:', error);
    }
  }

  async verifyCode() {
    try {
      const confirmationResult = await this.authService.verifyCode(this.verificationId, this.verificationCode);
      console.log("confirmationResult", confirmationResult);
      
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error('Error during code verification:', error);
    }
  }
}
