import { EmployeeState, State } from '../state';
import { Employee } from '../api/dto/employee';
import { Actions } from './index';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';
import { EmployeeFormState } from '../state/form/employee-form.state';
import { RoleEnum } from '../api/role.enum';

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
    (form: EmployeeFormState) =>
      (state: State, actions: Actions) =>
        Promise<EmployeeModel>;
}

export const employeeActions: ActionsType<EmployeeState, EmployeeActions> = {
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

  fetchAll: () => (_, actions) => {
    actions.setLoading(true);
    employeeService
      .getAll()
      .then((employees) => {
        actions.setLoading(false);
        actions.setList(employees);
        return employees;
      });
  },

  create: (form: EmployeeFormState) => () => {
    const { emailAddress, firstName, lastName, active, password, role } = form.controls;
    // @TODO VALIDATION

    const employee: Employee = {
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    };

    return employeeService
      .create(employee, password!.value!, (role!.value as RoleEnum))
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },
};
