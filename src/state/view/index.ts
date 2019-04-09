import { defaultEmployeesViewState, EmployeesViewState } from './employees-view.state';

export interface ViewState {
  employees: EmployeesViewState;
}

export const defaultViewState: ViewState = {
  employees: defaultEmployeesViewState,
};
