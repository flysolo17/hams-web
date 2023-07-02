export enum ToastType {
  SUCCESS,
  ERROR,
}
export class ToastModel {
  public message: string;
  public type: ToastType;
  public active: boolean;
  public position?: ToastPosition;
  constructor(
    message: string,
    type: ToastType,
    active: boolean,
    position?: ToastPosition
  ) {
    this.message = message;
    this.type = type;
    this.active = active;
    this.position = position;
  }
}
export enum ToastPosition {
  TOP,
  BOTTOM,
}
