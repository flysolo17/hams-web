import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Users } from '../models/Users';
import { TOKEN_KEY } from '../utils/StringUtils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    let result = localStorage.getItem(TOKEN_KEY);
    if (result !== null) {
      this.getUserById(result);
    } else {
      this.router.navigate(['login']);
    }
  }

  getUserById(token: string) {
    this.authService.getUserByID(token).subscribe({
      next: (v: Users) => {
        console.log(v);
        if (v.type == 0) {
          this.router.navigate(['super-admin']);
        } else if (v.type == 1) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['teacher']);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
