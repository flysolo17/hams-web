import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classes } from '../models/Classes';
import { Curriculum } from '../models/Curriculum';
import { SubjectService } from '../services/subject.service';
import { Observable, Subscription, map } from 'rxjs';
import { Subjects } from '../models/Subjects';
import { ClassesService } from '../services/classes.service';
import { getSubjectPerSem } from '../utils/Constants';
import { Location } from '@angular/common';
import { Schedule } from '../models/Schedule';
import {
  ToastModel,
  ToastPosition,
  ToastType,
} from '../cards/toast/ToastModel';
declare var window: any;

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit, OnDestroy {
  toast: ToastModel | null = null;
  addSubjectDialog: any;
  class$: Classes | undefined;
  subjects$: Subjects[] = [];
  clickedSemester: number | undefined;
  selectedIndex: number = -1;
  selectedIndex2: number = -1;
  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private classesService: ClassesService,
    private location: Location
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
      .then(() => this.showToast('Successfully updated', ToastType.SUCCESS))
      .catch((err: any) => this.showToast(err.message, ToastType.ERROR))
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  back() {
    this.location.back();
  }
  selectIndex(index: number) {
    if (this.selectedIndex != index) {
      this.selectedIndex = index;
    } else {
      this.selectedIndex = -1;
    }
  }
  selectIndex2(index: number) {
    if (this.selectedIndex2 != index) {
      this.selectedIndex2 = index;
    } else {
      this.selectedIndex2 = -1;
    }
  }
  addSched(index: number, sem: number) {
    let sched: Schedule = {
      day: '',
      startTime: '',
      endTime: '',
    };
    this.getCurriculumBySem(sem)[index].schedules.push(sched);
  }
  removeSched(index: number, sem: number, indexToRemove: number) {
    this.getCurriculumBySem(sem)[index].schedules.splice(indexToRemove, 1);
  }
  enableSaveButton(index: number, sem: number): number {
    let data = this.getCurriculumBySem(sem)[index].schedules.filter(
      (data) => data.day === '' || data.startTime === '' || data.endTime == ''
    );
    return data.length;
  }
  countCurriculum(index: number, sem: number): number {
    return this.getCurriculumBySem(sem)[index].schedules.length;
  }
  updateCurriculum() {
    let id: string = this.class$?.id!;
    let curriculum: Curriculum[] = this.class$?.curriculum!;
    this.classesService
      .updateSchedule(id, curriculum)
      .then(() => {
        this.showToast('Curriculum updated successfully!', ToastType.SUCCESS);
      })
      .catch((err) => this.showToast(err.message, ToastType.ERROR))
      .finally(() => {
        this.selectedIndex = -1;
        this.selectedIndex2 = -1;
      });
  }

  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.BOTTOM);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
