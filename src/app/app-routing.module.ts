import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { ClassesComponent } from './classes/classes.component';
import { SubjectComponent } from './subject/subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { RecordComponent } from './record/record.component';
import { GradeComponent } from './grade/grade.component';
import { ChatComponent } from './chat/chat.component';
import { AcademicComponent } from './academic/academic.component';
import { LibraryComponent } from './library/library.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ViewAcademicsComponent } from './view-academics/view-academics.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'record', component: RecordComponent },
      { path: 'academic', component: AcademicComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'chat', component: ChatComponent },
      {
        path: 'classes',
        component: ClassesComponent,
      },
      { path: 'settings', component: SettingsComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'classes/add-subject', component: AddSubjectComponent },
      {
        path: 'enrollment/view-academics/:id',
        component: ViewAcademicsComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

const mainRoute: Routes = [{}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
