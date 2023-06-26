import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/Student';
import { StudentService } from '../services/student.service';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { AcademicStatus } from '../models/Academic';
import { StudentStatus } from '../models/StudentStatus';
import { Location } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-view-academics',
  templateUrl: './view-academics.component.html',
  styleUrls: ['./view-academics.component.scss'],
})
export class ViewAcademicsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}
  PLACEHOLDER = '../../assets/images/employee.jpg';
  id!: string;
  student$!: Student;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getStudentProfile(this.id);
  }
  getStudentProfile(id: string) {
    this.studentService
      .getStudentByID(id)
      .then((data: DocumentSnapshot<Student>) => {
        if (data.exists()) {
          this.student$ = data.data();
          if (this.student$.profile === '') {
            this.student$.profile = this.PLACEHOLDER;
          }
        } else {
          alert('Student not found!');
        }
      });
  }
  buttonAccept(index: number) {
    this.student$.academics[index].academicStatus = AcademicStatus.ACCEPTED;
    this.studentService
      .updateAcademic(
        this.student$.id,
        this.student$.academics,
        StudentStatus.ENROLLED
      )
      .then(() => alert('Enrollment accepted'))
      .catch((err: FirebaseError) => alert(err.message))
      .finally(() => {})
      .finally(() => this.location.back());
  }
  buttonReject(index: number) {
    this.student$.academics[index].academicStatus = AcademicStatus.REJECTED;
    this.studentService
      .updateAcademic(
        this.student$.id,
        this.student$.academics,
        StudentStatus.PRE_ENROLLED
      )
      .then(() => alert('Enrollment Rejected'))
      .catch((err: FirebaseError) => alert(err.message))
      .finally(() => {})
      .finally(() => this.location.back());
  }
}
