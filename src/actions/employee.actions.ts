import { State, UserState } from '../state';
import { Employee } from '../api/dto/employee';
import { EmployeeForm } from '../state/form';
import { Actions } from './index';
import { ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';

export interface EmployeeActions {
  create:
    (form: EmployeeForm) =>
      (state: State, actions: Actions) =>
        Promise<Employee>;
}

export const employeeActions: ActionsType<State, EmployeeActions> = {
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
      });
  },
};
