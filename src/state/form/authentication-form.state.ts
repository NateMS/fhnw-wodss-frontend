import { FormControl, BaseFormState } from './types';

export interface AuthenticationFormState extends BaseFormState {
  controls: {
    emailAddress: FormControl<string>;
    rawPassword: FormControl<string>;
  };
}

export const initAuthenticationForm: () => AuthenticationFormState = () => ({
  controls: {
    emailAddress: {
      name: 'emailAddress',
      value: null,
    },
    rawPassword: {
      name: 'rawPassword',
      value: null,
    },
  },
  isOpen: false,
  isSaving: false,
});
