import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';
declare var window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forgotPasswordModal: any;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.forgotPasswordModal = new window.bootstrap.Modal(
      document.getElementById('forgotPasswordModal')
    );
  }
  login() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    if (!!email && !!password) {
      this.signIn(email, password);
    } else {
      console.log('Failed');
    }
  }
  forgotPassword(email: string) {
    this.authService
      .forgotPassword(email)
      .then(() => alert('Password reset link sent to : ' + email))
      .catch((err) => alert(err.message))
      .finally(() => {
        this.closeModal();
      });
  }
  signIn(email: string, password: string) {
    this.authService
      .login(email, password)
      .then(
        (user: UserCredential) => {
          if (!!user) {
            alert('Welcome back!');
            this.router.navigate(['main']);
          }
        },
        (err) => alert(err.message)
      )
      .catch((err) => alert(err.message))
      .finally(() => {});
  }

  openModal() {
    this.forgotPasswordModal.show();
  }
  closeModal() {
    this.forgotPasswordModal.hide();
  }
}
