import { User } from '../api/user';

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  user: User | null;
}

export interface State {
  user: UserState;
}

export const state: State = {
  user: {
    authenticated: false,
    loading: false,
    user: null,
  },
};
