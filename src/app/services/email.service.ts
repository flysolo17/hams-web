import { Injectable } from '@angular/core';
import { ResponseData } from '../domain/ResponseData';
import { HttpClient } from '@angular/common/http';
import { TOKEN_KEY } from '../utils/StringUtils';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  url = 'http://localhost:3000/email/';
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(TOKEN_KEY) || '';
  }

  sendEmail(data: any) {
    return this.http
      .post<ResponseData>(
        this.url + 'send-email',
        {
          to: data.email,
          subject: data.subject,
          text: data.message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }
      )
      .pipe(delay(1000));
  }
}
