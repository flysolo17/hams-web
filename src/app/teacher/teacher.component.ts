import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  constructor(private location: Location) {}
  logout() {
    localStorage.clear();
    this.location.back();
  }
}
