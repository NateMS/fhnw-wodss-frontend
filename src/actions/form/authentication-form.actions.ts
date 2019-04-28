import { ActionsType } from 'hyperapp';
import {
  AuthenticationFormState,
  initAuthenticationForm,
} from '../../state/form/authentication-form.state';
import { GenericFormActions, patch, setSaving, updateValue } from './index';

export const authenticationFormActions: ActionsType<AuthenticationFormState, GenericFormActions<AuthenticationFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  setOpen: () => state => state,
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initAuthenticationForm());
  },
};
