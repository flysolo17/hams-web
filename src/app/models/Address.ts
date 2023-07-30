import { AddressType } from './AddressType';

export class Address {
  id?: number;
  student_id?: number;
  house_no?: number;
  street?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  country?: string;
  zip_code?: string;
  type?: AddressType;

  constructor(
    student_id?: number,
    house_no?: number,
    street?: string,
    barangay?: string,
    municipality?: string,
    province?: string,
    country?: string,
    zip_code?: string,
    type?: AddressType,
    id?: number
  ) {
    this.id = id;
    this.student_id = student_id;
    this.house_no = house_no;
    this.street = street;
    this.barangay = barangay;
    this.municipality = municipality;
    this.province = province;
    this.country = country;
    this.zip_code = zip_code;
    this.type = type;
  }
}
