import { Academic } from './Academic';
import { Contacts } from './Contacts';
import { StudentInformation } from './StudentInformation';
import { StudentStatus } from './StudentStatus';

export interface Student {
  id: string;
  email: string;
  profile: string;
  studentInfo: StudentInformation;
  contacts: Contacts;
  status: StudentStatus;
  academics: Academic[];
  createdAt: Date;
}
