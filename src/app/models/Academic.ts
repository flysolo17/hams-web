import { Grade } from './Grade';

export interface Academic {
  id: string;
  classID: string;
  sem: string;
  grades: Grade[];
  academicStatus: AcademicStatus;
}
export enum AcademicStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}
