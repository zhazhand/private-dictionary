export interface Toast {
  className?: string;
  text: string;
  delay?: number;
  cb?: Function;
  optionalText?: string;
}
