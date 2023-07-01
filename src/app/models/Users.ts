import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { UserType } from './UserType';

export interface Users {
  id: string;
  email: string;
  name: string;
  profile: string;
  type: UserType;
  createdAt: Date;
}
export const userConverter = {
  toFirestore: (data: Users) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Users,
};
