import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { ProjectFormState, initProjectForm } from '../../state/form/project-form.state';

export const projectFormActions: ActionsType<ProjectFormState, GenericFormActions<ProjectFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initProjectForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};
