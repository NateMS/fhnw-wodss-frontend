import { userActions, UserActions } from './user-actions';
import { ActionsType } from 'hyperapp';
import { State } from '../state';

export interface Actions {
  user: UserActions;
}

export const actions: ActionsType<State, Actions> = {
  user: userActions,
};
