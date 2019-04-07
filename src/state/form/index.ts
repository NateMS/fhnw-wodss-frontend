import { EmployeeFormState, initEmployeeForm } from './employee-form.state';
import { AuthenticationFormState, initAuthenticationForm } from './authentication-form.state';

export interface FormState {
  authentication: AuthenticationFormState;
  employee: EmployeeFormState;
  [key: string]: any;
}

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
};
