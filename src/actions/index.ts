import { userActions, UserActions } from './user.actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';
import { employeeActions, EmployeeActions } from './employee.actions';
import { toastActions, ToastActions } from './toast.actions';
import { formActions, FormActions } from './form';
import { ProjectActions, projectActions } from './project.actions';
import { AllocationActions, allocationActions } from './allocation.actions';
import { contractActions, ContractActions } from './contract.actions';
import { viewActions, ViewActions } from './view';

export interface Actions {
  location: LocationActions;
  user: UserActions;
  form: FormActions;
  view: ViewActions;
  employee: EmployeeActions;
  project: ProjectActions;
  allocation: AllocationActions;
  contract: ContractActions;
  toast: ToastActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
  form: formActions,
  view: viewActions,
  employee: employeeActions,
  project: projectActions,
  allocation: allocationActions,
  contract: contractActions,
  toast: toastActions,
};
