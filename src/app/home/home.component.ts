import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../models/Student';
import { docData } from '@angular/fire/firestore';
import {
  getDropOutStudents,
  getEnrolledStudents,
  getPreEnrolledStudents,
} from '../utils/Constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  students$: Student[] = [];
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.subscription = studentService
      .getAllStudents()
      .subscribe((data: Student[]) => {
        this.students$ = data;
      });
  }

  getEnrolled(): Student[] {
    return getEnrolledStudents(this.students$);
  }
  getPreEnrolled(): Student[] {
    return getPreEnrolledStudents(this.students$);
  }
  getDropout(): Student[] {
    return getDropOutStudents(this.students$);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
  logout() {
    console.log('dsadas');
    this.authService
      .logout()
      .then(() => console.log('success'))
      .catch((err) => console.log(err.mesage));
  }
}
