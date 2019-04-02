import { EmployeeState, State, UserState } from '../state';
import { Employee } from '../api/dto/employee';
import { EmployeeForm } from '../state/form';
import { Actions } from './index';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';

export interface EmployeeActions {
  setLoading:
    (isLoading: boolean) =>
      (state: EmployeeState) =>
        ActionResult<EmployeeState>;
  fetchAll:
    () =>
      (state: EmployeeState, actions: EmployeeActions) =>
        Promise<EmployeeModel[]>;
  setList:
    (employees: EmployeeModel[]) =>
      (state: EmployeeState) =>
        ActionResult<EmployeeState>;
  create:
    (form: EmployeeForm) =>
      (state: State, actions: Actions) =>
        Promise<EmployeeModel>;
}

export const employeeActions: ActionsType<State, EmployeeActions> = {
  setLoading: isLoading => state => (
    Object.assign({}, state, {
      isLoading,
    })
  ),

  setList: employees => state => (
    Object.assign({}, state, {
      list: [...employees],
    })
  ),

  fetchAll: () => (state, actions) => {
    actions.setLoading(true);
    employeeService
      .getAll()
      .then((employees) => {
        actions.setLoading(false);
        actions.setList(employees);
      })
      .catch((error) => {
        // TODO: ERROR HANDLING
        console.log('ERROR', error);
      });
  },

  create: (form: EmployeeForm) => (state, actions) => {
    // @TODO VALIDATION
    const employee: Employee = {
      emailAddress: form.emailAddress!,
      firstName: form.firstName!,
      lastName: form.lastName!,
      active: form.active!,
    };

    return employeeService
      .create(employee, form.password!, form.role!)
      .then((employee: EmployeeModel) => {
        console.log('employee', employee);
        return employee;
      })
      .catch((error) => {
        // TODO: Error handling
      });
  },
};
