import { Component, OnInit } from '@angular/core';
import { TOKEN_KEY } from './utils/StringUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    let result = localStorage.getItem(TOKEN_KEY);
    if (result !== null) {
      this.router.navigate(['main']);
    } else {
      this.router.navigate(['login']);
    }
  }
  title = 'hams-webv2';
}
