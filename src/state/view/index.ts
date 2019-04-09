import { defaultEmployeesViewState, EmployeesViewState } from './employees-view.state';
import { defaultProjectsViewState, ProjectsViewState } from './projects-view.state';

export interface ViewState {
  employees: EmployeesViewState;
  projects: ProjectsViewState;
}

export const defaultViewState: ViewState = {
  employees: defaultEmployeesViewState,
  projects: defaultProjectsViewState,
};
