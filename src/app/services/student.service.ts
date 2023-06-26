import { Injectable } from '@angular/core';
import {
  DocumentSnapshot,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Student, studentConverter } from '../models/Student';
import { STUDENT_TABLE } from '../utils/Constants';
import { Observable } from 'rxjs';
import { Academic } from '../models/Academic';
import { StudentStatus } from '../models/StudentStatus';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  REF = collection(this.firestore, STUDENT_TABLE);
  constructor(private firestore: Firestore) {}
  addStudent(student: Student) {
    return setDoc(doc(this.firestore, STUDENT_TABLE, student.id), student);
  }
  deleteStudent(id: string) {
    return deleteDoc(doc(this.firestore, STUDENT_TABLE, id));
  }
  getAllStudents(): Observable<Student[]> {
    const q = query(this.REF, orderBy('createdAt', 'asc'));
    return collectionData(q) as Observable<Student[]>;
  }
  getStudentByID(id: string): Promise<DocumentSnapshot<Student>> {
    return getDoc(
      doc(this.firestore, STUDENT_TABLE, id).withConverter(studentConverter)
    );
  }
  updateAcademic(id: string, academic: Academic[], status: StudentStatus) {
    return updateDoc(doc(this.firestore, STUDENT_TABLE, id), {
      status: StudentStatus.ENROLLED,
      academics: academic,
    });
  }
}
