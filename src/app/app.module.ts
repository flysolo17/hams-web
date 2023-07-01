import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { ClassesComponent } from './classes/classes.component';
import { SubjectComponent } from './subject/subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { RecordComponent } from './record/record.component';
import { AcademicComponent } from './academic/academic.component';
import { LibraryComponent } from './library/library.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { GradeComponent } from './grade/grade.component';
import { ChatComponent } from './chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddStudentComponent } from './add-student/add-student.component';
import { SubjectCardComponent } from './cards/subject-card/subject-card.component';
import { ViewAcademicsComponent } from './view-academics/view-academics.component';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    MainComponent,
    ClassesComponent,
    SubjectComponent,
    AddSubjectComponent,
    RecordComponent,
    AcademicComponent,
    LibraryComponent,
    EnrollmentComponent,
    GradeComponent,
    ChatComponent,
    AddStudentComponent,
    SubjectCardComponent,
    ViewAcademicsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
