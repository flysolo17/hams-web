import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Users } from '../models/Users';

import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';
import { Subscription } from 'rxjs';
import { SubjectWithTeacher } from '../models/SubjectWithTeacher';
import { UserType } from '../models/UserType';
import { ResponseData } from '../domain/ResponseData';
import { STORAGE } from '../utils/StringUtils';
declare var window: any;
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, OnDestroy {
  toast: ToastModel | null = null;
  createSubjectDialog: any;
  subjectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    teacher_id: new FormControl('Select Teacher', Validators.required),
  });
  teacherForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),
    gender: new FormControl('MALE', Validators.required),
  });
  editSubjectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    unit: new FormControl(0, Validators.required),
    teacher_id: new FormControl('Select Teacher', Validators.required),
  });
  selectedID: number = -1;
  selectedImage!: File;

  teachers$: Users[] = [];
  subjects$: SubjectWithTeacher[] = [];
  ALL_SUBJECTS: SubjectWithTeacher[] = [];
  ALL_TEACHERS: Users[] = [];
  private subjectSubscription: Subscription;
  private teacherSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private subjectService: SubjectService
  ) {
    this.subjectSubscription = subjectService.getAllSubjects().subscribe({
      next: (v: ResponseData) => {
        this.ALL_SUBJECTS = v.data;
        this.subjects$ = v.data;
      },
      error: (e: any) => this.showToast(e['statusText'], ToastType.ERROR),
    });
    this.teacherSubscription = authService.getAllTeachers().subscribe({
      next: (v: ResponseData) => {
        let data: any[] = v.data;
        data.map((value) => {
          if (value['profile'] != null)
            value['profile'] = STORAGE + value['profile'];
        });
        console.log(data);
        this.ALL_TEACHERS = data;
        this.teachers$ = v.data;
      },
      error: (e: any) => this.showToast(e['statusText'], ToastType.ERROR),
    });
  }

  ngOnDestroy(): void {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
    if (this.teacherSubscription) {
      this.teacherSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.createSubjectDialog = new window.bootstrap.Modal(
      document.getElementById('createSubjectDialog')
    );
  }
  createSubject() {
    this.subjectService.addSubject(this.subjectForm.value).subscribe({
      next: (v: any) => {
        this.subjects$.push(v['data'][0] as SubjectWithTeacher);
        this.showToast(v['message'], ToastType.SUCCESS);
      },
      error: (e: any) => this.showToast(e, ToastType.ERROR),
      complete: () => {
        this.subjectForm.reset();
        this.createSubjectDialog.hide();
      },
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  createTeacher() {
    console.log('Creating teacher!');
    let name = this.teacherForm.controls.name.value ?? '<no-name>';
    let email = this.teacherForm.controls.email.value ?? '<no-email>';
    let gender = this.teacherForm.controls.gender.value ?? '0';
    const formData = new FormData();
    formData.append('profile', this.selectedImage);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    this.authService.signup(formData).subscribe({
      next: (v: any) => {
        {
          console.log(v);
          this.showToast(v['message'], ToastType.SUCCESS);
        }
      },
      error: (e) => {
        console.log(e);
        this.showToast(
          e['status'] + ' : ' + e['error']['message'],
          ToastType.ERROR
        );
      },
      complete: () => this.teacherForm.reset(),
    });
  }

  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }

  expanded(id: number) {
    if (this.selectedID !== id) {
      this.selectedID = id;
    } else {
      this.selectedID = -1;
    }
    console.log(this.selectedID);
  }
  updateSubject(subject: SubjectWithTeacher) {}

  onSubjectSearch(e: string) {
    if (e !== '') {
      this.subjects$ = this.subjects$.filter((data) =>
        data.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      );
    } else {
      this.subjects$ = this.ALL_SUBJECTS;
    }
  }
  onTeacherSearch(e: string) {
    if (e !== '') {
      this.teachers$ = this.teachers$.filter((data) =>
        data.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      );
    } else {
      this.teachers$ = this.ALL_TEACHERS;
    }
  }
}
