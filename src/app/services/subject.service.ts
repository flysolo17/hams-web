import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SubjectWithTeacher } from '../models/SubjectWithTeacher';
import { TOKEN_KEY } from '../utils/StringUtils';
import { delay } from 'rxjs';
import { ResponseData } from '../domain/ResponseData';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  url = 'http://localhost:3000/subjects/';
  token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(TOKEN_KEY) || '';
    console.log(this.token);
  }

  addSubject(data: any) {
    return this.http
      .post<ResponseData>(this.url + 'insert', data, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }
  getAllSubjects() {
    return this.http
      .get<ResponseData>(this.url, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }
}
