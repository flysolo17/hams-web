import { Component } from '@angular/core';
import { ToastModel, ToastType } from '../cards/toast/ToastModel';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent {
  toast: ToastModel | null = null;
  show() {
    this.toast = new ToastModel('Success', ToastType.SUCCESS, true);
    setTimeout(() => {
      this.toast = null;
    }, 2000); // 2 seconds
  }
}
