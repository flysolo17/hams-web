import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { AddressType } from '../models/AddressType';
import { ContactType } from '../models/ContactType';
import { SubjectService } from '../services/subject.service';
import { Subscription } from 'rxjs';
import { SubjectWithTeacher } from '../models/SubjectWithTeacher';
import { Subjects } from '../models/Subjects';
import { Location } from '@angular/common';
declare var window: any;
@Component({
  selector: 'app-view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.scss'],
})
export class ViewEnrollmentComponent implements OnInit, OnDestroy {
  emailFormModal: any;
  LOADING = false;
  toast: ToastModel | null = null;
  student: Students | null = null;
  enrollmentData: Enrollments | null = null;
  private subjectSubscription: Subscription;
  subjects$: SubjectWithTeacher[] = [];
  ALL_SUBJECTS: SubjectWithTeacher[] = [];

  email: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private subjectService: SubjectService,
    private location: Location
  ) {
    this.subjectSubscription = subjectService.getAllSubjects().subscribe({
      next: (v: ResponseData) => {
        this.ALL_SUBJECTS = v.data;
        this.subjects$ = v.data;
      },
      error: (e: any) => this.showToast(e['statusText'], ToastType.ERROR),
    });
  }

  ngOnInit(): void {
    this.emailFormModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
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
          myObject['enrolled_subjects'] ?? []
        );
        console.log(this.enrollmentData);
        this.getLearnerInfo(myObject['student_id']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
  }

  computeAge(date: string): number {
    return getAge(date);
  }
  updateEnrollmentStatus(status: number, email: string) {
    this.email = email;
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
          this.emailFormModal.show();
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

  getAddressType(type: AddressType): string {
    return type == AddressType.CURRENT ? 'CURRENT' : 'PERMANENT';
  }
  getContactType(type: ContactType): string {
    var contact = 'GUARDIAN';
    switch (type) {
      case ContactType.FATHER:
        contact = 'FATHER';

        break;
      case ContactType.MOTHER:
        contact = 'MOTHER';

        break;
      case ContactType.GUARDIAN:
        contact = 'GUARDIAN';
        break;
      default:
        contact = 'GUARDIAN';
        break;
    }
    return contact;
  }

  isOffcanvasOpen = false;
  openOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  getEnrolledSubjects(subject: Subjects[]) {
    return this.subjects$.filter(
      (item) => !subject.some((removeItem) => removeItem.id === item.id)
    );
  }
  addSubjectToEnroll(
    id: number,
    name: string,
    code: string,
    techer_id: string
  ) {
    this.LOADING = true;
    if (this.enrollmentData !== null) {
      this.enrollmentService
        .addSubjectToEnroll(this.enrollmentData?.id!, id)
        .subscribe({
          next: (v: ResolveData) => {
            if (v['success'] == true) {
              this.enrollmentData?.enrolled_subjects?.push({
                id: id,
                name: name,
                code: code,
                teacher_id: techer_id,
              });
            }
            this.showToast(v['message'], ToastType.SUCCESS);
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
  }
}
