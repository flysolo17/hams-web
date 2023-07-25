export class Enrollments {
  id: number;
  student_id: number;
  grade_level: number;
  school_year: string;
  track?: string;
  strand?: string;
  semester?: number;
  enrollment_date: Date;
  updated_at: Date;
  enrollment_types: Set<string>;
  status: number;

  constructor(
    id: number,
    student_id: number,
    grade_level: number,
    school_year: string,
    track: string,
    strand: string,
    semester: number,
    enrollment_date: Date,
    updated_at: Date,
    enrollment_types: Set<string>,
    status: number
  ) {
    this.id = id;
    this.student_id = student_id;
    this.grade_level = grade_level;
    this.school_year = school_year;
    this.track = track;
    this.strand = strand;
    this.semester = semester;
    this.enrollment_date = enrollment_date;
    this.updated_at = updated_at;
    this.enrollment_types = enrollment_types;
    this.status = status;
  }
}
