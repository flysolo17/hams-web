class EnrollmentData {
  constructor(
    id,
    grade_level,
    school_year,
    track,
    strand,
    semester,
    enrollment_date,
    updated_at,
    enrollment_types,
    status,
    enrolled_subjects
  ) {
    this.id = id;
    this.grade_level = grade_level;
    this.school_year = school_year;
    this.track = track;
    this.strand = strand;
    this.semester = semester;
    this.enrollment_date = enrollment_date;
    this.updated_at = updated_at;
    this.enrollment_types = enrollment_types;
    this.status = status;
    this.enrolled_subjects = enrolled_subjects;
  }
}

class Subject {
  constructor(id, code, name, unit, created_at, teacher_id, updated_at) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.unit = unit;
    this.created_at = created_at;
    this.teacher_id = teacher_id;
    this.updated_at = updated_at;
  }
}
