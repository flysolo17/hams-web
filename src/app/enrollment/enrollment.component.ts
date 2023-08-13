import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../services/enrollment.service';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { Enrollments } from '../models/Enrollments';
import { STORAGE, formatDateTime } from '../utils/StringUtils';
import { Router } from '@angular/router';
import { StudentWithEnrollment } from '../models/StudentWithEnrollment';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent implements OnInit {
  LOADING = true;
  toast: ToastModel | null = null;
  enrollments$: Enrollments[] = [];
  recentEnrolled$: StudentWithEnrollment[] = [];
  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.enrollmentService.getAllEnrollments().subscribe({
      next: (v: Enrollments[]) => {
        this.enrollments$ = v;
      },
      error: (e: any) => this.showToast(e.message, ToastType.ERROR),
      complete: () => {
        this.LOADING = false;
        this.getRecentEnrolled();
      },
    });
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
  getEnrollmentByStatus(status: number): Enrollments[] {
    return this.enrollments$.filter((data) => data.status === status);
  }

  convertDate(date: string): string {
    return formatDateTime(date);
  }

  navigateToViewMore(enrollment: Enrollments) {
    console.log(enrollment);
    const serializedObject = JSON.stringify(enrollment);
    this.router.navigate([
      'super-admin/enrollment/view-enrollment',
      { data: serializedObject },
    ]);
  }
  getRecentEnrolled() {
    this.enrollmentService.getCurrentEnrolled().subscribe({
      next: (v: StudentWithEnrollment[]) => {
        this.recentEnrolled$ = v;
        this.recentEnrolled$.map((value) => {
          if (value['profile'] != null)
            value['profile'] = STORAGE + value['profile'];
        });
        console.log(v);
      },
      error: (e: any) => this.showToast(e.message, ToastType.ERROR),
    });
  }
  navigateToRecords(enrollment: StudentWithEnrollment) {
    const serializedObject = JSON.stringify(enrollment);
    this.router.navigate([
      'super-admin/enrollment/view-student-record',
      { data: serializedObject },
    ]);
  }
}
