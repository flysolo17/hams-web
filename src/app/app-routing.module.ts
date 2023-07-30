import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SubjectComponent } from './subject/subject.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewEnrollmentComponent } from './view-enrollment/view-enrollment.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdministratorComponent } from './admin/administrator/administrator.component';
import { SuperAdminMainComponent } from './super-admin/super-admin-main/super-admin-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'admin', component: AdministratorComponent },
  {
    path: 'super-admin',
    component: SuperAdminMainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'subject', component: SubjectComponent },
      {
        path: 'enrollment',
        children: [
          { path: '', component: EnrollmentComponent },
          { path: 'view-enrollment', component: ViewEnrollmentComponent },
        ],
      },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
