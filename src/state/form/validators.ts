import { FormControl, FormErrors } from './types';

export const textRequiredValidator = (control: FormControl<string>): FormErrors => {
  if (control.value != null && control.value.length === 0) {
    return {
      required: true,
    };
  }

  return;
};

export const textMaxValidator = (maxLength: number) => (control: FormControl<string>): FormErrors => {
  if (control.value != null && control.value.length > maxLength) {
    return {
      max: true,
    };
  }

  return;
};
