import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Users } from '../models/Users';
import {
  DocumentSnapshot,
  Firestore,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { getDownloadURL } from '@angular/fire/storage';
import { USER_TABLE } from '../utils/Constants';
import { User, UserCredential } from '@angular/fire/auth';

declare var window: any;
declare var window2: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  editProfile: any;
  changePassword: any;
  PLACEHOLDER = '../../assets/images/employee.jpg';
  FOR_UPLOAD: any = null;
  user$: Users | null = null;

  constructor(private authService: AuthService) {
    authService.getCurrentUser().subscribe((result) => {
      if (result) {
        const documentRef = doc(this.firestore, USER_TABLE, result.uid);
        onSnapshot(
          documentRef,
          (snapshot) => {
            this.user$ = snapshot.data() as Users;
            if (this.user$.profile === '') {
              this.user$.profile = this.PLACEHOLDER;
            }
            // Handle document changes here
          },
          (error) => {
            console.error('Error listening to document changes:', error);
          }
        );
      }
    });
  }
  ngOnInit(): void {
    this.editProfile = new window.bootstrap.Modal(
      document.getElementById('editProfile')
    );
    this.changePassword = new window.bootstrap.Modal(
      document.getElementById('changePassword')
    );
  }
  openModal() {
    this.editProfile.show();
  }
  closeModal() {
    this.editProfile.hide();
  }
  onSelectImage(event: any) {
    this.FOR_UPLOAD = event.target.files[0];
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.PLACEHOLDER = e.target.result;
      };
    }
  }

  saveProfile(name: string) {
    if (this.user$ != null) {
      if (this.FOR_UPLOAD == null) {
        this.updateUser(this.user$.id, name, this.user$.profile);
      } else {
        this.uploadProfile(this.user$.id, name, this.FOR_UPLOAD);
      }
    }
  }
  updateUser(uid: string, name: string, profile: string) {
    if (this.user$ != null) {
      this.authService
        .updateUser(uid, name, profile)
        .then(() => alert('successfully updated!'))
        .catch((err) => alert(err.message))
        .finally(() => {
          this.closeModal();
        });
    }
  }
  async uploadProfile(id: string, name: string, file: File) {
    try {
      const result = await this.authService.uploadProfile(file);
      if (result) {
        console.log('uploaded');
        this.updateUser(id, name, result);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  async validatePassword(old: string, newPassword: string) {
    this.authService
      .validatePassword(old)
      .then(
        (value: UserCredential) => {
          let user = value.user;
        },
        (err) => alert(err.message)
      )
      .catch((err) => alert(err.message));
  }
  updatePassword() {
    // this.authService
    //   .updatePassword(user, newPassword)
    //   .then(() => {
    //     alert('Password updated successfully');
    //     console.log('Password updated successfully');
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //     console.error('Error updating password:', error);
    //   });
    alert('This feature is not implemented yet!');
  }
}
