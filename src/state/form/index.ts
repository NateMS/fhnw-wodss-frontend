import { EmployeeFormState, initEmployeeForm } from './employee-form.state';
import { AuthenticationFormState, initAuthenticationForm } from './authentication-form.state';
import { initProjectForm, ProjectFormState } from './project-form.state';
import { ContractFormState, initContractFormState } from './contract-form.state';
import { AllocationFormState, initAllocationForm } from './allocation-form.state';

export interface FormState {
  authentication: AuthenticationFormState;
  employee: EmployeeFormState;
  project: ProjectFormState;
  contract: ContractFormState;
  allocation: AllocationFormState;
  [key: string]: any;
}

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
  project: initProjectForm(),
  contract: initContractFormState(),
  allocation: initAllocationForm(),
};
