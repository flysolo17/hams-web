export interface StudentWithEnrollment {
  id: number;
  lrn: string;
  email: string;
  profile: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  extension_name: string | null;
  birth_date: Date;
  gender: number;
  nationality: string;
  created_at: Date;
  password: string;
  student_id: number;
  grade_level: number;
  school_year: string;
  track: string | null;
  strand: string | null;
  semester: number;
  enrollment_date: Date;
  updated_at: Date;
  enrollment_types: string;
  status: number;
}
