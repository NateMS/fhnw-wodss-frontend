import { BaseForm, FormControl } from './types';
import { textRequiredValidator, emailValidator, consoleLogValidator, selectValidator } from './validators';

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
      validators: [
        textRequiredValidator,
      ],
    },
    lastName: {
      name: 'lastName',
      value: null,
      validators: [
        textRequiredValidator,
      ],
    },
    role: {
      name: 'role',
      value: null,
      validators: [
        selectValidator("Please select"),
      ],
    },
    emailAddress: {
      name: 'emailAddress',
      value: null,
      validators: [
        textRequiredValidator,
        emailValidator,
      ],
    },
    password: {
      name: 'password',
      value: null,
      validators: [
        textRequiredValidator,
      ],
    },
    active: {
      name: 'active',
      value: null,
    },
  },
});
