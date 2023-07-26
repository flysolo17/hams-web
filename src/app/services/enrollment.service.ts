import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../utils/StringUtils';
import { ResponseData } from '../domain/ResponseData';
import { delay } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Enrollments } from '../models/Enrollments';
import { Students } from '../models/Students';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  url = 'http://localhost:3000/enrollment/';
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(TOKEN_KEY) || '';
  }
  getAllEnrollments() {
    return this.http
      .get<Enrollments[]>(this.url, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }

  updateEnrollmentStatus(id: number, status: number) {
    const param = `${this.url}/update-enrollment-status?id=${id}&status=${status}`;
    return this.http.patch<ResponseData>(param, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }
  getLearnerInfo(id: number) {
    return this.http
      .get<Students>(this.url + '/learner-info', {
        params: {
          student_id: id,
        },
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }
}
