import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/Student';
import {
  filterEnrollment,
  getDropOutStudents,
  getEnrolledStudents,
  getPreEnrolledStudents,
} from '../utils/Constants';
import { Subscription } from 'rxjs';
import { Academic, AcademicStatus } from '../models/Academic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent implements OnInit, OnDestroy {
  students$: Student[] = [];
  private subscription: Subscription;
  constructor(private studentService: StudentService, private router: Router) {
    this.subscription = this.studentService
      .getAllStudents()
      .subscribe((data: Student[]) => {
        console.log('sub');
        this.students$ = data;
      });
  }
  ngOnInit(): void {}

  getAccepted(): Academic[] {
    let data: Academic[] = [];
    this.students$.map((student) => {
      student.academics.map((academic) => {
        if (academic.academicStatus === AcademicStatus.ACCEPTED) {
          data.push(academic);
        }
      });
    });
    return data;
  }
  getRejected(): Academic[] {
    let data: Academic[] = [];
    this.students$.map((student) => {
      student.academics.map((academic) => {
        if (academic.academicStatus === AcademicStatus.REJECTED) {
          data.push(academic);
        }
      });
    });
    return data;
  }
  getRequest(): Academic[] {
    let data: Academic[] = [];
    this.students$.map((student) => {
      student.academics.map((academic) => {
        if (academic.academicStatus === AcademicStatus.REQUESTED) {
          data.push(academic);
        }
      });
    });
    return data;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('unsub');
      this.subscription.unsubscribe();
    }
  }

  getEnrollmentRequestPerStudent(student: Student): Academic[] {
    return filterEnrollment(student);
  }

  navigate(student: Student) {
    this.router.navigate(['/main/enrollment/view-academics', student.id]);
  }
}
