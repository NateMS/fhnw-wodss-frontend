export interface FormControl<T> {
  name: string;
  value: T | null;
  errors?: [{[key: string]: string}];
}

export interface BaseFormState {
  isSaving: boolean;
  isOpen: boolean;
  controls: {[key: string]: any};
}
