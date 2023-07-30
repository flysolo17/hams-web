import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TOKEN_KEY, convertFileToBlob } from '../utils/StringUtils';
import { Users } from '../models/Users';
import { delay } from 'rxjs';
import { ResponseData } from '../domain/ResponseData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/auth/';
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(TOKEN_KEY) || '';
  }
  signInWithEmailAndPassword(data: any) {
    return this.http
      .post<ResponseData>(this.url + 'login', data)
      .pipe(delay(1000));
  }
  signup(data: FormData) {
    return this.http
      .post<ResponseData>(this.url + 'add-user', data, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }
  getAllTeachers() {
    return this.http
      .get<ResponseData>(this.url + 'teachers', {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }

  getAllUsers() {
    return this.http
      .get<ResponseData>(this.url + 'users', {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .pipe(delay(1000));
  }

  getUserByID(token: string) {
    return this.http
      .get<Users>(this.url + 'get-user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .pipe(delay(1000));
  }
}
