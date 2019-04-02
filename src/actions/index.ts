import { userActions, UserActions } from './user.actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';
import { formActions, FormActions } from './form.actions';
import { employeeActions, EmployeeActions } from './employee.actions';

export interface Actions {
  location: LocationActions;
  user: UserActions;
  form: FormActions;
  employee: EmployeeActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
  form: formActions,
  employee: employeeActions,
};
