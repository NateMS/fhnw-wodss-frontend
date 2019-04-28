export enum FormErrorType {
  required = 'required',
  email = 'email',
  negativeDuration = 'negativeDuration',
}

export type FormErrors = {[key in FormErrorType]?: boolean} | undefined;
export type ValidatorFunction<T> = (control: FormControl<T>, state: BaseForm) => FormErrors;

export interface FormControl<T> {
  name: string;
  value: T | null;
  errors?: FormErrors;
  validators?: ValidatorFunction<T>[];
}

export interface BaseForm {
  isSaving: boolean;
  isOpen: boolean;
  controls: {[key: string]: any};
}

export interface ListForm<T extends BaseForm> {
  list: T[];
}
