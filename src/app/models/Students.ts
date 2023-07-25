class Students {
  id?: number;
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
  created_at?: Date;
  password: string;

  constructor(
    lrn: string,
    password: string,
    id?: number,
    email?: string,
    profile?: string,
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    extension_name?: string,
    birth_date?: Date,
    gender?: number,
    nationality?: string,
    created_at?: Date
  ) {
    this.id = id;
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
    this.created_at = created_at;
    this.password = password;
  }
}
