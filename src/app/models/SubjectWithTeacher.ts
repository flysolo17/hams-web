export interface SubjectWithTeacher {
  id: number;
  name: string;
  code: string;
  unit: number;
  created_at: Date;
  updated_at?: Date;
  teacher_id: string;
  teacher: string;
  gender: string;
  profile?: string;
}
