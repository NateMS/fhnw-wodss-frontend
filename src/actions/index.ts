import { userActions, UserActions } from './user.actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';
import { employeeActions, EmployeeActions } from './employee.actions';
import { toastActions, ToastActions } from './toast.actions';
import { formActions, FormActions } from './form';
import { ProjectActions, projectActions } from './project.actions';

export interface Actions {
  location: LocationActions;
  user: UserActions;
  form: FormActions;
  employee: EmployeeActions;
  project: ProjectActions;
  toast: ToastActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
  form: formActions,
  employee: employeeActions,
  project: projectActions,
  toast: toastActions,
};
