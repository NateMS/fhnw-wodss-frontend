import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { EmployeeFormState, initEmployeeForm } from '../../state/form/employee-form.state';

export const employeeFormActions: ActionsType<EmployeeFormState, GenericFormActions<EmployeeFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initEmployeeForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};
