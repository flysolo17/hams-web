import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcademicsComponent } from './view-academics.component';

describe('ViewAcademicsComponent', () => {
  let component: ViewAcademicsComponent;
  let fixture: ComponentFixture<ViewAcademicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAcademicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
