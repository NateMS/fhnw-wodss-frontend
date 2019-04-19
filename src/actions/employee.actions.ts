import { EmployeeState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';
import { Role } from '../api/role';
import { EmployeeRequestModel } from '../api/dto/employee.request.model';

export interface EmployeeActions {
  setLoading: (isLoading: boolean) => (state: EmployeeState) => ActionResult<EmployeeState>;
  fetchAll: () => (state: EmployeeState, actions: EmployeeActions) => Promise<EmployeeModel[]>;
  setList: (employees: EmployeeModel[]) => (state: EmployeeState) => ActionResult<EmployeeState>;
  create: (create: EmployeeCreateModel) => () => Promise<EmployeeModel>;
  update: (update: EmployeeUpdateModel) => () => Promise<EmployeeModel>;
  delete: (id: string) => () => Promise<void>;
}

interface EmployeeCreateModel {
  employee: EmployeeRequestModel,
  password: string,
  role: Role,
}

interface EmployeeUpdateModel {
  employee: EmployeeRequestModel,
  id: string,
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

  create: (create: EmployeeCreateModel) => () => {
    const { employee, password, role } = create;

    return employeeService
      .create(employee, password, role)
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  update: (update: EmployeeUpdateModel) => () => {
    const { employee, id } = update;

    return employeeService
      .update(employee, id)
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  delete: (id: string) => () => {
    return employeeService.delete(id);
  },
};
