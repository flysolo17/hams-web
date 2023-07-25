import { Component, Input, OnInit } from '@angular/core';
import { ToastModel } from './ToastModel';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() toast: ToastModel | null = null;
  ngOnInit(): void {}

  hideToast() {
    if (this.toast) {
      this.toast.active = false;
    }
  }
}
