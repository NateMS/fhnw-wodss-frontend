import { BaseForm, FormControl } from './types';

export interface EmployeeFormState extends BaseForm {
  controls: {
    id: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    emailAddress: FormControl<string>;
    active: FormControl<boolean>;
    password: FormControl<string>;
    role: FormControl<string>;
  };
}

export const initEmployeeForm: () => EmployeeFormState = () => ({
  isOpen: false,
  isSaving: false,
  controls: {
    id: {
      name: 'id',
      value: null,
    },
    firstName: {
      name: 'firstName',
      value: null,
    },
    lastName: {
      name: 'lastName',
      value: null,
    },
    role: {
      name: 'role',
      value: null,
    },
    emailAddress: {
      name: 'emailAddress',
      value: null,
    },
    password: {
      name: 'password',
      value: null,
    },
    active: {
      name: 'active',
      value: null,
    },
  },
});
