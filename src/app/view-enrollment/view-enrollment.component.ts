import { Component, OnInit } from '@angular/core';
import { STORAGE, getAge } from '../utils/StringUtils';
import { ActivatedRoute, ResolveData } from '@angular/router';
import { EnrollmentService } from '../services/enrollment.service';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { ResponseData } from '../domain/ResponseData';
import { Students } from '../models/Students';
import { Enrollments } from '../models/Enrollments';

@Component({
  selector: 'app-view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.scss'],
})
export class ViewEnrollmentComponent implements OnInit {
  LOADING = false;
  toast: ToastModel | null = null;
  student: Students | null = null;
  enrollmentData: Enrollments | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const serializedObject = params.get('data');
      const myObject = serializedObject ? JSON.parse(serializedObject) : null;
      if (myObject) {
        // Create an instance of EnrollmentData using the extracted data
        this.enrollmentData = new Enrollments(
          myObject['id'],
          myObject['student_id'],
          myObject['grade_level'],
          myObject['school_year'],
          myObject['track'],
          myObject['strand'],
          myObject['semester'],
          myObject['enrollment_date'],
          myObject['updated_at'],
          myObject['enrollment_types'],
          myObject['status'],
          myObject['enrolled_subjects']
        );
        console.log(myObject['student_id']);
        this.getLearnerInfo(myObject['student_id']);
      }
    });
  }

  computeAge(date: string): number {
    return getAge(date);
  }
  updateEnrollmentStatus(status: number) {
    this.LOADING = true;
    this.enrollmentService
      .updateEnrollmentStatus(this.enrollmentData?.id!, status)
      .subscribe({
        next: (v: ResponseData) => {
          this.showToast(v.message ?? 'Success', ToastType.SUCCESS);
          this.LOADING = false;
        },
        error: (e: any) => {
          this.showToast(e.message, ToastType.ERROR);
          this.LOADING = false;
        },
        complete: () => {
          this.LOADING = false;
        },
      });
  }
  getLearnerInfo(id: number) {
    this.LOADING = true;
    this.enrollmentService.getLearnerInfo(id).subscribe({
      next: (v: Students) => {
        v.profile = STORAGE + v.profile ?? null;
        console.log(v);
        this.student = v;
        this.showToast('Success', ToastType.SUCCESS);
        this.LOADING = false;
      },
      error: (e: any) => {
        this.showToast(e.message, ToastType.ERROR);
        this.LOADING = false;
      },
      complete: () => {
        this.LOADING = false;
      },
    });
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
