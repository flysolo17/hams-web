import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Curriculum } from './Curriculum';
import { EducationLevel } from './EducationLevel';

export interface Classes {
  id: string;
  name: string;
  schoolYear: string;
  educationLevel: string;
  curriculum: Curriculum[];
  createdAt: Date;
}

export const classesConverter = {
  toFirestore: (data: Classes) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Classes,
};
