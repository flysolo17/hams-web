import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SubjectComponent } from './subject/subject.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewEnrollmentComponent } from './view-enrollment/view-enrollment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'subject', component: SubjectComponent },
      {
        path: 'enrollment',
        children: [
          { path: '', component: EnrollmentComponent },
          { path: 'view-enrollment/:id', component: ViewEnrollmentComponent },
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
