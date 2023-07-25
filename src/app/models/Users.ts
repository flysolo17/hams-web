import { UserType } from './UserType';

export interface Users {
  id: string;
  name: string;
  profile?: string;
  type: UserType;
  email: string;
  password: string;
}
