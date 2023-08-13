export enum EnrollmentStatus {
  PROCESSING = 'PROCESSING',
  ENROLLED = 'ENROLLED',
  CANCELLED = 'CANCELLED',
  DECLINE = 'DECLINE',
  FINISHED = 'FINISHED',
}
export const EnrollmentStatusByIndex = [
  EnrollmentStatus.PROCESSING,
  EnrollmentStatus.ENROLLED,
  EnrollmentStatus.CANCELLED,
  EnrollmentStatus.DECLINE,
  EnrollmentStatus.FINISHED,
];
