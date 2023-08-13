import { Component, OnInit } from '@angular/core';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { EnrollmentService } from '../services/enrollment.service';
import { Enrollments } from '../models/Enrollments';
import { STORAGE, formatDateTime } from '../utils/StringUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentWithEnrollment } from '../models/StudentWithEnrollment';
import {
  EnrollmentStatus,
  EnrollmentStatusByIndex,
} from '../models/EnrollmentStatus';

@Component({
  selector: 'app-view-student-record',
  templateUrl: './view-student-record.component.html',
  styleUrls: ['./view-student-record.component.scss'],
})
export class ViewStudentRecordComponent implements OnInit {
  LOADING = false;
  toast: ToastModel | null = null;
  history$: Enrollments[] = [];
  enrollmentData: StudentWithEnrollment | null = null;
  constructor(
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const serializedObject = params['data'];
      if (serializedObject) {
        this.enrollmentData = JSON.parse(serializedObject);
        if (this.enrollmentData != null) {
          this.getEnrollmentHistory(this.enrollmentData.student_id);
        }
      }
    });
  }

  getEnrollmentHistory(id: number) {
    this.enrollmentService.getEnrollmentHistory(id).subscribe({
      next: (v: Enrollments[]) => {
        this.history$ = v;
        console.log(v);
      },
      error: (e: any) => this.showToast(e.message, ToastType.ERROR),
    });
  }

  formatDateString(date: string) {
    return formatDateTime(date);
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
  getEnrollmentStatus(stat: number) {
    return EnrollmentStatusByIndex[stat];
  }
}
