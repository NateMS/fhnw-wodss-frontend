import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { AllocationFormState, initAllocationForm } from '../../state/form/allocation-form.state';
import { Actions } from '../index';

export const allocationFormActions: ActionsType<AllocationFormState, GenericFormActions<AllocationFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initAllocationForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};

export const showAllocationCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.allocation.reset();
  actions.form.allocation.setOpen(show);
};
