import { Address } from './Address';
import { Contacts } from './Contacts';

export class Students {
  lrn: string;
  email?: string;
  profile?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  extension_name?: string;
  birth_date?: Date;
  gender?: number;
  nationality?: string;
  addresses: Address[] = [];
  contacts: Contacts[] = [];

  constructor(
    lrn: string,
    email?: string,
    profile?: string,
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    extension_name?: string,
    birth_date?: Date,
    gender?: number,
    nationality?: string,
    addresses: Address[] = [],
    contacts: Contacts[] = []
  ) {
    this.lrn = lrn;
    this.email = email;
    this.profile = profile;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.extension_name = extension_name;
    this.birth_date = birth_date;
    this.gender = gender;
    this.nationality = nationality;
    this.addresses = addresses;
    this.contacts = contacts;
  }
}
