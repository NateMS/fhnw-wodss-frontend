import { userActions, UserActions } from './user-actions';
import { ActionsType } from 'hyperapp';
import { location, LocationActions } from '@hyperapp/router';
import { State } from '../state';

export interface Actions {
  location: LocationActions;
  user: UserActions;
}

export const actions: ActionsType<State, Actions> = {
  location: location.actions,
  user: userActions,
};
