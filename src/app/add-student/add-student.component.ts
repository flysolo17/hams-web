import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { StudentService } from '../services/student.service';
import { generateStudentID, isIdExists } from '../utils/Constants';
import { ContactType } from '../models/ContactType';
import { StudentStatus } from '../models/StudentStatus';
import { Gender } from '../models/Gender';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm = new FormGroup({
    lrn: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('MALE', Validators.required),
    dob: new FormControl(new Date(), [Validators.required]),
    emergencyName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    type: new FormControl('PARENT', [Validators.required]),
  });

  constructor(
    private studentService: StudentService,
    private location: Location
  ) {}
  ngOnInit(): void {}
  back() {
    this.location.back();
  }
  saveStudent() {
    let id = this.studentForm.controls.lrn.value!.toString();
    this.studentService
      .addStudent(this.generateStudent(id))
      .then(() => {
        alert('New Student created!');
      })
      .catch((err) => alert(err.message))
      .finally(() => this.location.back());
  }
  generateStudent(id: string): Student {
    let newStudent: Student = {
      id: id,
      email: this.studentForm.controls.email.value!,
      profile: '',
      studentInfo: {
        firstName: this.studentForm.controls.firstName.value!,
        middleName: this.studentForm.controls.middleName.value!,
        lastname: this.studentForm.controls.lastName.value!,
        gender:
          this.studentForm.controls.gender.value === 'MALE'
            ? Gender.MALE
            : Gender.FEMALE,
        nationality: 'Filipino',
        dob: new Date(this.studentForm.controls.dob.value!),
      },
      contacts: {
        name: this.studentForm.controls.emergencyName.value!,
        phone: this.studentForm.controls.phone.value!,
        type:
          this.studentForm.controls.type.value! === 'PARENT'
            ? ContactType.PARENT
            : ContactType.GUARDIAN,
      },
      status: StudentStatus.PRE_ENROLLED,
      academics: [],
      createdAt: new Date(),
    };
    return newStudent;
  }
}
