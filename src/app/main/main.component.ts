import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare var window: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  logoutModal: any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.logoutModal = new window.bootstrap.Modal(
      document.getElementById('logoutModal')
    );
  }

  logoutFunc() {
    this.authService
      .logout()
      .then(
        () => {
          this.closeModal();
          alert('Successfully Logged out!');
        },
        (err) => alert('Failed to logout')
      )
      .catch((err) => alert(err.message))
      .finally(() => this.router.navigate(['']));
  }
  openModal() {
    this.logoutModal.show();
  }
  closeModal() {
    this.logoutModal.hide();
  }
}
