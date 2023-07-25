import { Component, OnInit } from '@angular/core';
import { getAge } from '../utils/StringUtils';
import { ActivatedRoute, ResolveData } from '@angular/router';
import { EnrollmentService } from '../services/enrollment.service';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { ResponseData } from '../domain/ResponseData';

@Component({
  selector: 'app-view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.scss'],
})
export class ViewEnrollmentComponent implements OnInit {
  id: number | null = null;
  LOADING = false;
  toast: ToastModel | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = +params.get('id')! ;
    });
  }

  computeAge(date: string): number {
    return getAge(date);
  }
  updateEnrollmentStatus(status: number) {
    this.LOADING = true;
    this.enrollmentService.updateEnrollmentStatus(this.id!, status).subscribe({
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

  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
