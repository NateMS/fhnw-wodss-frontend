import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { ProjectFormState, initProjectForm } from '../../state/form/project-form.state';
import { Actions } from '../index';

export const projectFormActions: ActionsType<ProjectFormState, GenericFormActions<ProjectFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initProjectForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};

export const showProjectCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.project.reset();
  actions.form.project.setOpen(show);
};
