import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentRecordComponent } from './view-student-record.component';

describe('ViewStudentRecordComponent', () => {
  let component: ViewStudentRecordComponent;
  let fixture: ComponentFixture<ViewStudentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
