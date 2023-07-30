import { Gender } from './Gender';
import { UserType } from './UserType';

export interface Users {
  id: string;
  name: string;
  profile?: string;
  type: UserType;
  email: string;
  gender: Gender;
  password: string;
}
