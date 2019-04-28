import { EmployeesViewState } from '../../state/view/employees-view.state';
import { ActionResult, ActionsType } from 'hyperapp';

export interface EmployeesViewActions {
  updateFilterString: (filterString: string) => (state: EmployeesViewState) => ActionResult<EmployeesViewState>;
}

export const employeesViewActions: ActionsType<EmployeesViewState, EmployeesViewActions> = {
  updateFilterString: filterString => () => ({
    filterString,
  }),
};
