import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../reusable/toast/ToastModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/Users';
import { Subscription } from 'rxjs';
import { ResponseData } from '../domain/ResponseData';
import { STORAGE } from '../utils/StringUtils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  toast: ToastModel | null = null;
  teacherForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),
    gender: new FormControl('MALE', Validators.required),
    type: new FormControl('ADMIN', Validators.required),
  });

  selectedID: number = -1;
  selectedImage!: File;

  teachers$: Users[] = [];
  ALL_TEACHERS: Users[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
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

  createTeacher() {
    console.log('Creating teacher!');
    let name = this.teacherForm.controls.name.value ?? '<no-name>';
    let email = this.teacherForm.controls.email.value ?? '<no-email>';
    let gender = this.teacherForm.controls.gender.value ?? '0';
    let type = this.teacherForm.controls.type.value ?? '1';
    const formData = new FormData();
    formData.append('profile', this.selectedImage);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('type', type);
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
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
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
