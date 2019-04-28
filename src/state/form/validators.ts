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
  const emailRegex = new RegExp([
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@/,
    /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ].map((r) => { return r.source; }).join(''));

  if (control.value != null && control.value.length > 0 && !emailRegex.test(control.value.toLowerCase())) {
    return {
      email: true,
    };
  }

  return;
};

export const durationValidator = (control: FormControl<Moment>, state: BaseForm): FormErrors => {
  const { controls } = state;

  if (control.value != null && control.name === 'startDate' && control.value.isSameOrAfter(controls['endDate'].value)) {
    return {
      negativeDuration: true,
    };
  }

  if (control.value != null && control.name === 'endDate' && control.value.isSameOrBefore(controls['startDate'].value)) {
    return {
      negativeDuration: true,
    };
  }

  return;
};

export const selectValidator = (control: FormControl<string>): FormErrors => {
  if (control.value != null && control.value.length === 0) {
    return {
      required: true,
    };
  }

  return;
};
