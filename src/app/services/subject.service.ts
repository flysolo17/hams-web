import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Subjects } from '../models/Subjects';
import { SUBJECT_TABLE } from '../utils/Constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  REF = collection(this.firestore, SUBJECT_TABLE);
  constructor(private firestore: Firestore) {}
  addSubject(subject: Subjects) {
    return setDoc(doc(this.REF, subject.id), subject);
  }
  getAllSubjects(): Observable<Subjects[]> {
    const q = query(this.REF, orderBy('createdAt', 'desc'));
    return collectionData(q) as Observable<Subjects[]>;
  }
  deleteSubject(id: string) {
    return deleteDoc(doc(this.REF, id));
  }
  updateSubject(subject: Subjects) {
    return updateDoc(doc(this.REF, subject.id), {
      name: subject.name,
      code: subject.code,
      units: subject.units,
      teacherID: subject.teacherID,
    });
  }
}
