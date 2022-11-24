export type FormikInputProps = {
  name: string;
  label: string;
  required: boolean;
  description?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export { default as FormikInput } from './FormikInput';
export { default as FormikSelect } from './FormikSelect';
export { default as FormikCheck } from './FormikCheck';
