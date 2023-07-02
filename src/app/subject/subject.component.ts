import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../services/subject.service';
import { Subjects } from '../models/Subjects';
import { v4 as uuidv4 } from 'uuid';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { Users } from '../models/Users';
import { UserType } from '../models/UserType';
import { DatePipe } from '@angular/common';
import { ToastModel, ToastType } from '../cards/toast/ToastModel';
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
    teacher: new FormControl('Select Teacher', Validators.required),
  });

  teacherForm = new FormGroup({
    name: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),
  });

  editSubjectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    teacher: new FormControl('Select Teacher', Validators.required),
  });
  selectedID: string = '';
  subjects$: Subjects[] = [];
  teachers$: Users[] = [];
  selectedImage!: File;
  private subjectSubscription: Subscription;
  private userSubscription: Subscription;
  teacher: any;
  constructor(
    private subjectService: SubjectService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.subjectSubscription = subjectService
      .getAllSubjects()
      .subscribe((data) => {
        this.subjects$ = data;
      });
    this.userSubscription = authService.getTeachers().subscribe((data) => {
      this.teachers$ = data;
    });
  }
  ngOnDestroy(): void {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.createSubjectDialog = new window.bootstrap.Modal(
      document.getElementById('createSubjectDialog')
    );
  }
  createSubject() {
    console.log(this.subjectForm.value);
    let subject: Subjects = {
      id: uuidv4(),
      name: this.subjectForm.get('name')?.value!,
      code: this.subjectForm.get('code')?.value!,
      units: +this.subjectForm.get('unit')?.value!,
      teacherID: this.subjectForm.get('teacher')?.value!,

      createdAt: new Date(),
    };
    this.subjectService
      .addSubject(subject)
      .then(() => this.showToast('New Subject created!', ToastType.SUCCESS))
      .catch((err) =>
        this.showToast('Failed to create subject!', ToastType.ERROR)
      )
      .finally(() => {
        console.log('Subject added! ');
        this.closeModal();
      });
  }
  deleteSubject(id: string) {
    this.subjectService
      .deleteSubject(id)
      .then(() => this.showToast('Subject deleted!', ToastType.SUCCESS))
      .catch((err) =>
        this.showToast('Failed to delete subject!', ToastType.ERROR)
      );
  }
  openModal() {
    this.createSubjectDialog.show();
  }
  closeModal() {
    this.createSubjectDialog.hide();
  }
  expanded(id: string) {
    if (this.selectedID !== id) {
      this.selectedID = id;
    } else {
      this.selectedID = '';
    }

    console.log(this.selectedID);
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  createTeacher() {
    console.log('Creating teacher!');

    let name = this.teacherForm.controls.name.value!;
    let user: Users = {
      id: uuidv4(),
      email: '',
      name: name,
      profile: '',
      type: UserType.TEACHER,
      createdAt: new Date(),
    };
    this.uploadProfile(this.selectedImage, user);
  }

  async uploadProfile(file: File, user: Users) {
    try {
      console.log('uploading profile');
      const result = await this.authService.uploadProfile(file);
      if (result) {
        user.profile = result;
        this.saveTeacher(user);
      }
    } catch (error) {
      this.showToast('Failed uploading profile', ToastType.ERROR);
      console.error(error);
    }
  }
  saveTeacher(user: Users) {
    console.log('Saving  User');
    this.authService
      .addUser(user)
      .then(() => {
        this.showToast('New teacher created!', ToastType.SUCCESS);
      })
      .catch((err) => this.showToast(err.message, ToastType.ERROR))
      .finally(() => {
        this.teacherForm.reset();
      });
  }
  formatDate(timestamp: any) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return this.datePipe.transform(date, 'mediumDate');
  }
  updateSubject(subject: Subjects) {
    this.subjectService
      .updateSubject(subject)
      .then(() => {
        this.showToast('Subject updated successfully!', ToastType.SUCCESS);
      })
      .catch((err) => {
        this.showToast(err.message, ToastType.ERROR);
      })
      .finally(() => {
        this.selectedID = '';
        console.log(subject.name, ' is updated!');
      });
  }

  getUserByID(id: string): Users | undefined {
    return this.teachers$.find((item) => item.id === id);
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
