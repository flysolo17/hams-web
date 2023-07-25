import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastComponent } from './reusable/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { SubjectService } from './services/subject.service';
import { TOKEN_KEY } from './utils/StringUtils';
import { SettingsComponent } from './settings/settings.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ViewEnrollmentComponent } from './view-enrollment/view-enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ToastComponent,
    SubjectComponent,
    HomeComponent,
    SettingsComponent,
    EnrollmentComponent,
    ViewEnrollmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
