import { Moment } from 'moment';
import { FormControl, FormErrors, BaseForm } from './types';

export const textRequiredValidator = (control: FormControl<string>): FormErrors => {
  if (control.value != null && control.value.length === 0) {
    return {
      required: true,
    };
  }

  return;
};

export const emailValidator = (control: FormControl<string>): FormErrors => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (control.value != null && control.value.length > 0 && !re.test(control.value.toLowerCase())) {
    return {
      email: true,
    };
  }

  return;
};

export const durationValidator = (control: FormControl<Moment>, state: BaseForm): FormErrors => {
  const { controls } = state;

  if (control.value != null && control.name === "startDate" && control.value.isSameOrAfter(controls['endDate'].value)) {
    return {
      negativeDuration: true,
    };
  }

  if (control.value != null && control.name === "endDate" && control.value.isSameOrBefore(controls['startDate'].value)) {
    return {
      negativeDuration: true,
    };
  }

  return;
};

export const selectValidator = (defaultValue: string) => (control: FormControl<string>, state: BaseForm): FormErrors => {

  if (control.value != null && control.value === defaultValue) {
    return {
      required: true,
    };
  }

  return;
};
