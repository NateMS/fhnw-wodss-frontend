import { EmployeeFormState, initEmployeeForm } from './employee-form.state';
import { AuthenticationFormState, initAuthenticationForm } from './authentication-form.state';
<<<<<<< HEAD
import { initProjectForm, ProjectFormState } from './project-form.state';
=======
import { ContractFormState, initContractFormState } from './contract-form.state';
>>>>>>> remotes/origin/develop

export interface FormState {
  authentication: AuthenticationFormState;
  employee: EmployeeFormState;
<<<<<<< HEAD
  project: ProjectFormState;
=======
  contract: ContractFormState;
>>>>>>> remotes/origin/develop
  [key: string]: any;
}

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
<<<<<<< HEAD
  project: initProjectForm(),
=======
  contract: initContractFormState(),
>>>>>>> remotes/origin/develop
};
