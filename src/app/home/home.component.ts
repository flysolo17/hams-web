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
import { Users } from '../models/Users';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  students$: Student[] = [];
  teachers$: Users[] = [];
  subscription: Subscription;
  teacherSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private datePipe: DatePipe
  ) {
    this.subscription = studentService
      .getAllStudents()
      .subscribe((data: Student[]) => {
        this.students$ = data;
      });

    this.teacherSubscription = authService.getTeachers().subscribe((data) => {
      this.teachers$ = data;
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.teacherSubscription) {
      this.teacherSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {}
  logout() {
    console.log('dsadas');
    this.authService
      .logout()
      .then(() => console.log('success'))
      .catch((err) => console.log(err.mesage));
  }
  formatDate(timestamp: any) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return this.datePipe.transform(date, 'mediumDate');
  }
}
