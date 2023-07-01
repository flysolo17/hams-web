import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classes } from '../models/Classes';
import { Curriculum } from '../models/Curriculum';
import { SubjectService } from '../services/subject.service';
import { Observable, Subscription, map } from 'rxjs';
import { Subjects } from '../models/Subjects';
import { ClassesService } from '../services/classes.service';
import { getSubjectPerSem } from '../utils/Constants';
declare var window: any;

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit, OnDestroy {
  addSubjectDialog: any;
  class$: Classes | undefined;
  subjects$: Subjects[] = [];
  clickedSemester: number | undefined;
  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private classesService: ClassesService
  ) {
    this.subscription = subjectService.getAllSubjects().subscribe((data) => {
      this.subjects$ = data;
    });
    this.route.queryParams.subscribe((params) => {
      const encodedObject = params['data'];
      const decodedObject: Classes = JSON.parse(
        decodeURIComponent(encodedObject)
      );

      this.class$ = decodedObject;
    });
  }

  ngOnInit(): void {
    this.addSubjectDialog = new window.bootstrap.Modal(
      document.getElementById('addSubjectDialog')
    );
  }
  getCurriculum(): Curriculum[] {
    return this.class$?.curriculum!;
  }
  getTotalUnits(curriculum: Curriculum[]): number {
    var count = 0;
    curriculum.filter((c) => {
      let sub = this.getSubjectByID(c.subjectID);
      if (sub) {
        count += sub.units;
      }
    });
    return count;
  }
  addSubject(sem: number) {
    this.clickedSemester = sem;
    this.openModal();
  }
  saveSubject(curriculum: Curriculum[]) {
    this.classesService
      .addSubject(this.class$?.id!, curriculum)
      .then(() => alert('Successfully Updated!'))
      .catch((err: any) => alert(err.message))
      .finally(() => {
        this.closeModal();
        console.log('new subject added!');
      });
  }
  getSubjectByID(id: string): Subjects | undefined {
    return this.subjects$.find((item) => item.id === id);
  }
  openModal() {
    this.addSubjectDialog.show();
  }
  closeModal() {
    this.addSubjectDialog.hide();
  }
  getCurriculumBySem(sem: number): Curriculum[] {
    return getSubjectPerSem(sem, this.getCurriculum());
  }
  identifySemester(subjectID: string) {
    if (this.clickedSemester) {
      this.getCurriculum().push({
        subjectID: subjectID,
        sem: this.clickedSemester,
        schedules: [],
      });
      this.saveSubject(this.getCurriculum());
    }
  }
  checkSubjectIfExists(subjectID: string) {
    for (const obj of this.getCurriculum()) {
      if (obj.subjectID === subjectID) {
        return true;
      }
    }
    return false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
