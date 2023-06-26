import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../services/subject.service';
import { Subjects } from '../models/Subjects';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
declare var window: any;
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {
  createSubjectDialog: any;
  subjectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
  });
  subjects$: Observable<Subjects[]>;
  constructor(private subjectService: SubjectService) {
    this.subjects$ = subjectService.getAllSubjects();
  }
  ngOnInit(): void {
    this.createSubjectDialog = new window.bootstrap.Modal(
      document.getElementById('createSubjectDialog')
    );
  }
  createSubject() {
    let subject: Subjects = {
      id: uuidv4(),
      name: this.subjectForm.get('name')?.value!,
      code: this.subjectForm.get('code')?.value!,
      units: +this.subjectForm.get('unit')?.value!,
      teacher: this.subjectForm.get('teacher')?.value!,

      createdAt: new Date(),
    };
    this.subjectService
      .addSubject(subject)
      .then(() => alert('New Subject Added!'))
      .catch((err) => alert(err.message))
      .finally(() => {
        console.log('Subject added! ');
        this.closeModal();
      });
  }
  deleteSubject(id: string) {
    this.subjectService
      .deleteSubject(id)
      .then(() => alert('Successfully Deleted!'))
      .catch((err) => alert(err.message));
  }
  openModal() {
    this.createSubjectDialog.show();
  }
  closeModal() {
    this.createSubjectDialog.hide();
  }
}
