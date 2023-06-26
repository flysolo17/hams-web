import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hams-web';
  loading = true;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.loading = false;
      if (user !== null) {
        this.router.navigate(['main']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
