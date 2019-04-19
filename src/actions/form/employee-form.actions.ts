import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { EmployeeFormState, initEmployeeForm } from '../../state/form/employee-form.state';
import { Actions } from '../index';
import { EmployeeRequestModel } from '../../api/dto/employee.request.model';
import { EmployeeModel } from '../../api/dto/employee.model';
import { getToastMessage, getApiErrorToast } from '../../utils';
import { Role } from '../../api/role';

export const employeeFormActions: ActionsType<EmployeeFormState, GenericFormActions<EmployeeFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initEmployeeForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};

export const createEmployee = (state: EmployeeFormState, actions: Actions): void => {
  const { emailAddress, firstName, lastName, active, password, role } = state.controls;
  actions.form.employee.setSaving(true);

  try {
    const request = new EmployeeRequestModel({
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    });

    if (password.value == null) {
      throw Error(`'Password' is missing`);
    }

    if (role.value == null) {
      throw Error(`'Role' is missing`);
    }

    actions
      .employee
      .create({ employee: request, password: password.value, role: role.value as Role })
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
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error creating employee', error));
    actions.form.employee.setSaving(false);
  }
};

export const updateEmployee = (state: EmployeeFormState, actions: Actions) => {
  const { id, emailAddress, firstName, lastName, active } = state.controls;
  actions.form.employee.setSaving(true);
  try {
    const request = new EmployeeRequestModel({
      emailAddress: emailAddress.value!,
      firstName: firstName.value!,
      lastName: lastName.value!,
      active: active.value!,
    });

    if (id.value == null) {
      throw Error(`'ID' is missing`);
    }

    actions
      .employee
      .update({employee: request, id: id.value})
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
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error creating employee', error));
    actions.form.employee.setSaving(false);
  }
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
