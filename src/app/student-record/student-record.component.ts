import { Component, OnInit } from '@angular/core';
import { StudentWithEnrollment } from '../models/StudentWithEnrollment';
import { EnrollmentService } from '../services/enrollment.service';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { STORAGE } from '../utils/StringUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-record',
  templateUrl: './student-record.component.html',
  styleUrls: ['./student-record.component.scss'],
})
export class StudentRecordComponent implements OnInit {
  toast: ToastModel | null = null;
  allEnrolled$: StudentWithEnrollment[] = [];
  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllEnrolledStudent();
  }

  getAllEnrolledStudent() {
    this.enrollmentService.getAllEnrolled().subscribe({
      next: (v: StudentWithEnrollment[]) => {
        this.allEnrolled$ = v;
        this.allEnrolled$.map((value) => {
          if (value['profile'] != null)
            value['profile'] = STORAGE + value['profile'];
        });
        console.log(v);
      },
      error: (e: any) => this.showToast(e.message, ToastType.ERROR),
    });
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
  navigateToRecords(enrollment: StudentWithEnrollment) {
    const serializedObject = JSON.stringify(enrollment);
    this.router.navigate([
      'super-admin/record/view-student-record',
      { data: serializedObject },
    ]);
  }
}
