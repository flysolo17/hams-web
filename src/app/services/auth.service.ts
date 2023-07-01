import { Injectable, inject } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  User,
  UserCredential,
  authState,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from '@angular/fire/auth';
import {
  DocumentSnapshot,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, delay, of, switchMap } from 'rxjs';
import { USER_TABLE } from '../utils/Constants';
import { Users, userConverter } from '../models/Users';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../models/UserType';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null;
  constructor(
    private storage: Storage,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user = auth.currentUser;
  }

  addUser(user: Users): Promise<void> {
    return setDoc(doc(collection(this.firestore, USER_TABLE), user.id), user);
  }
  getTeachers(): Observable<Users[]> {
    const q = query(
      collection(this.firestore, USER_TABLE),
      where('type', '==', UserType.TEACHER)
    );
    return collectionData(q) as Observable<Users[]>;
  }
  getCurrentUser(): Observable<User | null> {
    return of(null).pipe(
      delay(1000),
      switchMap(() => authState(this.auth))
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
  getUserProfile(id: string): Promise<DocumentSnapshot<Users>> {
    return getDoc(
      doc(this.firestore, USER_TABLE, id).withConverter(userConverter)
    );
  }

  updateUser(id: string, name: string, profile: string) {
    return updateDoc(doc(this.firestore, USER_TABLE, id), {
      name: name,
      profile: profile,
    });
  }

  async uploadProfile(file: File) {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const fireRef = ref(
          this.storage,
          `${user.uid}/${USER_TABLE}/${uuidv4()}`
        );

        await uploadBytes(fireRef, file);
        const downloadURL = await getDownloadURL(fireRef);
        return downloadURL;
      } else {
        throw new Error('No user signed in.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  async validatePassword(currentPassword: string): Promise<UserCredential> {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword
        );
        return reauthenticateWithCredential(user, credential);
      } else {
        throw new Error('No user signed in.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  updatePassword(user: User, newPassword: string) {
    return updatePassword(user, newPassword);
  }
}
