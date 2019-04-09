export interface FormControl<T> {
  name: string;
  value: T | null;
  errors?: [{[key: string]: string}];
}

export interface BaseForm {
  isSaving: boolean;
  isOpen: boolean;
  controls: {[key: string]: any};
}

export interface ListForm<T extends BaseForm> {
  list: T[];
}
