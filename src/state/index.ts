import { location, LocationState } from '@hyperapp/router';
import { User } from '../api/user';

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  user: User | null;
}

export interface State {
  location: LocationState;
  user: UserState;
}

export const state: State = {
  location: location.state,
  user: {
    authenticated: false,
    loading: false,
    user: null,
  },
};
