import { GradeStatus } from './GradeStatus';

export interface Grade {
  subjectID: string;
  first: number;
  second: number;
  third: number;
  fourth: number;
  status: GradeStatus;
}
