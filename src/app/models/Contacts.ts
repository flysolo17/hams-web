import { ContactType } from './ContactType';

export interface Contacts {
  id?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone?: string;
  type?: ContactType;
}
