import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastModel, ToastType } from '../reusable/toast/ToastModel';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { TOKEN_KEY } from '../utils/StringUtils';
import { ResponseData } from '../domain/ResponseData';
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
  forgotPassword(email: string) {}

  openModal() {
    this.forgotPasswordModal.show();
  }
  closeModal() {
    this.forgotPasswordModal.hide();
  }
  login() {
    this.authService
      .signInWithEmailAndPassword(this.loginForm.value)
      .subscribe({
        next: (v: ResponseData) => {
          if (v.success) {
            this.showToast(v.message ?? 'Success', ToastType.SUCCESS);
            localStorage.setItem(TOKEN_KEY, v.data);
            setTimeout(() => {
              this.showToast('Success', ToastType.ERROR);
              this.router.navigate(['main']);
            }, 2000);
          } else {
            this.showToast(
              v.error ?? 'ERROR: ' + v.message ?? 'Unknown Error',
              ToastType.ERROR
            );
          }
        },
        error: (e) =>
          this.showToast(
            e['status'] + ' : ' + e['error']['message'],
            ToastType.ERROR
          ),
      });
  }

  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
