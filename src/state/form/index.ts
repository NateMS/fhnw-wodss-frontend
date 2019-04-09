import { EmployeeFormState, initEmployeeForm } from './employee-form.state';
import { AuthenticationFormState, initAuthenticationForm } from './authentication-form.state';
import { ContractFormState, initContractFormState } from './contract-form.state';

export interface FormState {
  authentication: AuthenticationFormState;
  employee: EmployeeFormState;
  contract: ContractFormState;
  [key: string]: any;
}

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
  contract: initContractFormState(),
};
