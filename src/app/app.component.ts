import { Component, OnInit } from '@angular/core';
import { TOKEN_KEY } from './utils/StringUtils';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Users } from './models/Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hams-webv2';
}
