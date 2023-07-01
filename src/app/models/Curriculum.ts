import { Schedule } from './Schedule';

export interface Curriculum {
  subjectID: string;
  sem: number;
  schedules: Schedule[];
}
