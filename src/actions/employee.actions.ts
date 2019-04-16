import { EmployeeState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { EmployeeModel } from '../api/dto/employee.model';
import { EmployeeFormState } from '../state/form/employee-form.state';
import { Role } from '../api/role';
import { Actions } from './index';
import { getApiErrorToast, getToastMessage } from '../utils';
import { EmployeeBaseModel } from '../api/dto/employee.base.model';

export interface EmployeeActions {
  setLoading: (isLoading: boolean) => (state: EmployeeState) => ActionResult<EmployeeState>;
  fetchAll: () => (state: EmployeeState, actions: EmployeeActions) => Promise<EmployeeModel[]>;
  setList: (employees: EmployeeModel[]) => (state: EmployeeState) => ActionResult<EmployeeState>;
  create: (form: EmployeeFormState) => () => Promise<EmployeeModel>;
  update: (form: EmployeeFormState) => () => Promise<EmployeeModel>;
  delete: (id: string) => () => Promise<void>;
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

    const employee: EmployeeBaseModel = {
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    };

    return employeeService
      .create(employee, password!.value!, (role!.value as Role))
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  update: (form: EmployeeFormState) => () => {
    const { id, emailAddress, firstName, lastName, active } = form.controls;
    // @TODO VALIDATION

    const employee: EmployeeBaseModel = {
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    };

    return employeeService
      .update(employee, id.value!)
      .then((employee: EmployeeModel) => {
        return employee;
      });
  },

  delete: (id: string) => () => {
    return employeeService.delete(id);
  },
};

export const createEmployee = (state: EmployeeFormState, actions: Actions): void => {
  actions.form.employee.setSaving(true);

  actions
    .employee
    .create(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully created employee '${employee.fullName}'`));
      actions.form.employee.setSaving(false);

      actions.form.employee.patch({
        ...employee,
      });

      // Refresh underlying view
      actions.employee.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
      actions.form.employee.setSaving(false);
    });
};

export const updateEmployee = (state: EmployeeFormState, actions: Actions) => {
  actions.form.employee.setSaving(true);

  actions
    .employee
    .update(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully updated employee '${employee.fullName}'`));
      actions.form.employee.setSaving(false);

      // Refresh underlying view
      actions.employee.fetchAll();
      actions.form.employee.reset();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updating employee', error));
      actions.form.employee.setSaving(false);
    });
};

export const deleteEmployee = (employee: EmployeeModel, actions: Actions) => {
  actions
    .employee
    .delete(employee.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Employee '${employee.fullName}' successfully deleted`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast(`Error deleting employee '${employee.fullName}'`, error));
    });
};
