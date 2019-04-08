import { EmployeeFormState, initEmployeeForm } from './employee-form.state';
import { AuthenticationFormState, initAuthenticationForm } from './authentication-form.state';
import { initProjectForm, ProjectFormState } from './project-form.state';

export interface FormState {
  authentication: AuthenticationFormState;
  employee: EmployeeFormState;
  project: ProjectFormState;
  [key: string]: any;
}

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
  project: initProjectForm(),
};
