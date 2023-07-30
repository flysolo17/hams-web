import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent {
  constructor(private location: Location) {}
  logout() {
    localStorage.clear();
    this.location.back();
  }
}
