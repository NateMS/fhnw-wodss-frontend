import { userActions, UserActions } from './user.actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';
import { formActions, FormActions } from './form.actions';

export interface Actions {
  location: LocationActions;
  user: UserActions;
  form: FormActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
  form: formActions,
};
