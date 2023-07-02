import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';
import { ToastModel, ToastType } from '../cards/toast/ToastModel';
declare var window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  toast: ToastModel | null = null;
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
      .then(() => {
        alert();
        let message = 'Password reset link sent to : ' + email;
        this.showToast(message, ToastType.SUCCESS);
      })
      .catch((err) => this.showToast(err.message, ToastType.ERROR))
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
            this.showToast('Successfully Logged in!', ToastType.SUCCESS);
            this.navigateToMain();
          }
        },
        (err) => this.showToast(err.message, ToastType.ERROR)
      )
      .catch((err) => this.showToast(err.message, ToastType.ERROR));
  }

  openModal() {
    this.forgotPasswordModal.show();
  }
  closeModal() {
    this.forgotPasswordModal.hide();
  }
  navigateToMain() {
    setTimeout(() => {
      this.router.navigate(['main']);
    }, 2000);
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
