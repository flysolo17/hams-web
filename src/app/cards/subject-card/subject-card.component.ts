import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Academic } from 'src/app/models/Academic';
import { Classes } from 'src/app/models/Classes';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss'],
})
export class SubjectCardComponent implements OnInit {
  @Input()
  academic: Academic | undefined;

  @Output() buttonAccept: EventEmitter<void> = new EventEmitter<void>();
  @Output() buttonRejet: EventEmitter<void> = new EventEmitter<void>();
  classes$: any;
  constructor(private classService: ClassesService) {}
  ngOnInit(): void {
    if (this.academic) {
      this.getClassByID(this.academic.classID);
    }
  }

  getClassByID(id: string) {
    this.classService.getClassByID(id).then((data) => {
      if (data.exists()) {
        this.classes$ = data.data();
      }
    });
  }
  getSemester(sem: string) {
    if (sem === '1') {
      return '1st Semester';
    } else {
      return '2nd Semester';
    }
  }
  accept() {
    this.buttonAccept.emit();
  }
  reject() {
    this.buttonRejet.emit();
  }
}
