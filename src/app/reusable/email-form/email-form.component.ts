import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResponseData } from 'src/app/domain/ResponseData';
import { EmailService } from 'src/app/services/email.service';
import { ToastModel, ToastPosition, ToastType } from '../toast/ToastModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnInit {
  @ViewChild('myModal') modalRef?: any;
  @Input() email!: string;
  toast: ToastModel | null = null;
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private location: Location
  ) {
    this.myForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  ngOnInit(): void {}

  // Function to submit the form
  onSubmit() {
    if (this.myForm.valid) {
      this.emailService.sendEmail(this.myForm.value).subscribe({
        next: (v: ResponseData) => {
          this.showToast('Successfully Fetched!', ToastType.SUCCESS);
        },
        error: (e: any) => this.showToast(e.message, ToastType.ERROR),
        complete: () => {
          this.location.back();
        },
      });
    }
  }
  showToast(message: string, type: ToastType) {
    this.toast = new ToastModel(message, type, true, ToastPosition.TOP);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
