import { ActionResult, ActionsType } from 'hyperapp';
import { User } from '../api/user';
import { UserState } from '../state';

export interface UserActions {
  login: () => (state: UserState, actions: UserActions) => ActionResult<UserState>;
  logout: () => (state: UserState) => ActionResult<UserState>;
  setUser: (user: User) => (state: UserState) => ActionResult<UserState>;
}

export const userActions: ActionsType<UserState, UserActions> = {
  login: () => (state, actions) => {
    if (state.authenticated) {
      throw new Error('User is already logged in');
    }

    setTimeout(
      () => {
        actions.setUser({
          userId: 1,
          emailAddress: 'kelvin.louis@students.fhnw.ch',
          firstName: 'Kelvin',
          lastName: 'Louis',
        });
      },
      2000,
    );

    return Object.assign({}, state, {
      loading: true,
    });
  },

  logout: () => (state) => {
    if (!state.authenticated) {
      throw new Error('User is not authenticated');
    }

    return {
      authenticated: false,
      loading: false,
      user: null,
    };
  },

  setUser: user => (state) => {
    return Object.assign({}, state, {
      user,
      loading: false,
      authenticated: true,
    });
  },
};
