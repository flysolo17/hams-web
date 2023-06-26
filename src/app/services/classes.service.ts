import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Classes, classesConverter } from '../models/Classes';
import { CLASSES_TABLE } from '../utils/Constants';
import { Observable, map } from 'rxjs';
import { Curriculum } from '../models/Curriculum';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  dbRef = collection(this.firestore, CLASSES_TABLE);

  constructor(private firestore: Firestore) {}
  addClass(classes: Classes) {
    return setDoc(doc(this.dbRef, classes.id), classes);
  }
  getAllClass(): Observable<Classes[]> {
    const q = query(this.dbRef, orderBy('createdAt', 'desc'));
    return collectionData(q) as Observable<Classes[]>;
  }
  deleteClass(id: string) {
    return deleteDoc(doc(this.dbRef, id));
  }
  addSubject(id: string, curriculum: Curriculum[]) {
    return updateDoc(doc(this.dbRef, id), {
      curriculum: curriculum,
    });
  }
  getClassByID(id: string): Promise<DocumentSnapshot<Classes>> {
    return getDoc(
      doc(this.firestore, CLASSES_TABLE, id).withConverter(classesConverter)
    );
  }
}
