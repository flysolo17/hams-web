import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var window: any;
@Component({
  selector: 'app-super-admin-main',
  templateUrl: './super-admin-main.component.html',
  styleUrls: ['./super-admin-main.component.scss'],
})
export class SuperAdminMainComponent {
  logoutModal: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.logoutModal = new window.bootstrap.Modal(
      document.getElementById('logoutModal')
    );
  }

  logoutFunc() {
    this.closeModal();
    localStorage.clear();
    this.router.navigate(['']);
  }
  openModal() {
    this.logoutModal.show();
  }
  closeModal() {
    this.logoutModal.hide();
  }
}
