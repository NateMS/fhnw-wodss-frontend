import { userActions, UserActions } from './user.actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';
import { employeeActions, EmployeeActions } from './employee.actions';
import { toastActions, ToastActions } from './toast.actions';
import { formActions, FormActions } from './form';
import { contractActions, ContractActions } from './contract.actions';

export interface Actions {
  location: LocationActions;
  user: UserActions;
  form: FormActions;
  employee: EmployeeActions;
  contract: ContractActions;
  toast: ToastActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
  form: formActions,
  employee: employeeActions,
  contract: contractActions,
  toast: toastActions,
};
