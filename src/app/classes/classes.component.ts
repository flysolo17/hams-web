import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Classes } from '../models/Classes';
import { ClassesService } from '../services/classes.service';
import {
  NAME_REGEX,
  getEducationLevel,
  getNextYear,
  getYearNow,
} from '../utils/Constants';
import { Observable, distinct, distinctUntilChanged, map } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Curriculum } from '../models/Curriculum';
import { Router } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  createClassDialog: any;

  classesForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('PRIMARY', Validators.required),
  });
  classes$: Observable<Classes[]>;
  items: string[] = [];
  constructor(private classService: ClassesService, private router: Router) {
    this.classes$ = this.classService.getAllClass();
  }
  ngOnInit(): void {
    this.createClassDialog = new window.bootstrap.Modal(
      document.getElementById('createClassDialog')
    );
  }

  openModal() {
    this.createClassDialog.show();
  }
  closeModal() {
    this.createClassDialog.hide();
  }
  viewSubject(classes: Classes) {
    const encodedObject = encodeURIComponent(JSON.stringify(classes));
    this.router.navigate(['main/classes/add-subject'], {
      queryParams: { data: encodedObject },
    });
  }
  saveClass() {
    if (this.classesForm.valid) {
      let data: Classes = {
        id: uuidv4(),
        name: this.classesForm.get('name')?.value!,
        schoolYear: getYearNow() + ' - ' + getNextYear(),
        educationLevel: getEducationLevel(this.classesForm.get('type')?.value!),
        curriculum: [],
        createdAt: new Date(),
      };

      console.log(data);
      this.classService
        .addClass(data)
        .then(
          () => alert('success'),
          (err) => alert(err)
        )
        .catch((err) => alert(err))
        .finally(() => this.closeModal());
    }
  }
  deleteClass(id: string) {
    this.classService
      .deleteClass(id)
      .then(
        () => alert('Successfully Deleted!'),
        (err) => alert(err.message)
      )
      .catch((err) => alert(err.message))
      .finally(() => console.log('Deleted with id: ', id));
  }
}
