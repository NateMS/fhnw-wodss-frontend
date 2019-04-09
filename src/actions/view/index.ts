import { employeesViewActions, EmployeesViewActions } from './employees-view.actions';
import { ActionsType } from 'hyperapp';
import { ViewState } from '../../state/view';
import { ProjectsViewActions } from './projects-view.actions';

export interface ViewActions {
  employees: EmployeesViewActions;
  projects: ProjectsViewActions;
}

export const viewActions: ActionsType<ViewState, ViewActions> = {
  employees: employeesViewActions,
  projects: ProjectsViewActions,
};
