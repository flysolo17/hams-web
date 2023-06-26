import { Gender } from './Gender';

export interface StudentInformation {
  firstName: string;
  middleName: string;
  lastname: string;
  gender?: Gender;
  nationality: string;
  dob?: Date;
}
