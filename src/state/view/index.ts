import { defaultEmployeesViewState, EmployeesViewState } from './employees-view.state';
import { defaultProjectsViewState, ProjectsViewState } from './projects-view.state';
import { defaultPlanningViewState, PlanningViewState } from './planning-view.state';

export interface ViewState {
  employees: EmployeesViewState;
  projects: ProjectsViewState;
  planning: PlanningViewState;
}

export const defaultViewState: ViewState = {
  employees: defaultEmployeesViewState,
  projects: defaultProjectsViewState,
  planning: defaultPlanningViewState,
};
