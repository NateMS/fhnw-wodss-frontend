import { employeesViewActions, EmployeesViewActions } from './employees-view.actions';
import { ActionsType } from 'hyperapp';
import { ViewState } from '../../state/view';
import { projectsViewActions, ProjectsViewActions } from './projects-view.actions';
import { planningViewActions, PlanningViewActions } from './planning-view.actions';

export interface ViewActions {
  employees: EmployeesViewActions;
  projects: ProjectsViewActions;
  planning: PlanningViewActions;
}

export const viewActions: ActionsType<ViewState, ViewActions> = {
  employees: employeesViewActions,
  projects: projectsViewActions,
  planning: planningViewActions,
};
