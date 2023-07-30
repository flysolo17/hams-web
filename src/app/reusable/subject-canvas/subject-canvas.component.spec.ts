import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCanvasComponent } from './subject-canvas.component';

describe('SubjectCanvasComponent', () => {
  let component: SubjectCanvasComponent;
  let fixture: ComponentFixture<SubjectCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
