import { Academic, AcademicStatus } from '../models/Academic';
import { Curriculum } from '../models/Curriculum';
import { EducationLevel } from '../models/EducationLevel';
import { Student } from '../models/Student';
import { StudentStatus } from '../models/StudentStatus';

export const CLASSES_TABLE: string = 'Classes';
export const STUDENT_TABLE: string = 'Students';
export const USER_TABLE: string = 'Users';
export const NAME_REGEX: RegExp = /^[a-z A-Z 0-9_.-]*$/;
export const SUBJECT_TABLE: string = 'Subjects';

export const generateNumber = (num: number, len: number) => {
  return num.toString().padStart(len, '0');
};

export function getYearNow(): string {
  return new Date().getFullYear().toString();
}
export function getNextYear(): string {
  let year = new Date().getFullYear() + 1;
  return year.toString();
}
// export const generateStudentID = (count: number) => {
//   const id =
//     generateNumber(1, 2) +
//     getLastTwoCharacter(getYearNow()) +
//     getLastTwoCharacter(getNextYear()) +
//     generateNumber(count, 5);
//   return id;
// };

export function isIdExists(array: Student[], id: string): boolean {
  for (const obj of array) {
    if (obj.id === id) {
      return true;
    }
  }
  return false;
}
export const getLastTwoCharacter = (str: string) => {
  return str.substring(str.length - 2);
};

export const getPreEnrolledStudents = (students: Student[]) => {
  return students.filter(
    (value) => value.status === StudentStatus.PRE_ENROLLED
  );
};
export const getEnrolledStudents = (students: Student[]) => {
  return students.filter((value) => value.status === StudentStatus.ENROLLED);
};

export const getDropOutStudents = (students: Student[]) => {
  return students.filter((value) => value.status === StudentStatus.DROP_OUT);
};

export const getEducationLevel = (str: string): EducationLevel => {
  if (str === EducationLevel.PRIMARY) {
    return EducationLevel.PRIMARY;
  } else if (str === EducationLevel.JUNIOR_HIGH_SCHOOL) {
    return EducationLevel.JUNIOR_HIGH_SCHOOL;
  } else {
    return EducationLevel.SENIOR_HIGH_SCHOOL;
  }
};

export function getSubjectPerSem(
  sem: number,
  curriculum: Curriculum[]
): Curriculum[] {
  return curriculum.filter((data) => data.sem === sem);
}
export function filterEnrollment(student: Student): Academic[] {
  return student.academics.filter(
    (value) => value.academicStatus == AcademicStatus.REQUESTED
  );
}
