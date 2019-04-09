import { employeesViewActions, EmployeesViewActions } from './employees-view.actions';
import { ActionsType } from 'hyperapp';
import { ViewState } from '../../state/view';

export interface ViewActions {
  employees: EmployeesViewActions;
}

export const viewActions: ActionsType<ViewState, ViewActions> = {
  employees: employeesViewActions,
};
