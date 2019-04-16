import { ActionResult, ActionsType } from 'hyperapp';
import { UserState } from '../state';
import { EmployeeModel } from '../api/dto/employee.model';
import { Credentials } from '../api/dto/credentials';
import { userService } from '../services/UserService';
import moment from 'moment';

export interface UserActions {
  login:
    (credentials: Credentials) =>
    (state: UserState, actions: UserActions) =>
      Promise<EmployeeModel>;
  refresh: () => (state: UserState, actions: UserActions) => Promise<EmployeeModel>;
  scheduleRefresh: (expirationTimestamp?: number) => (state: UserState, actions: UserActions) => null;
  restore: () => (state: UserState, actions: UserActions) => Promise<EmployeeModel>;
  logout: () => (state: UserState) => ActionResult<UserState>;
  patch: (values: Partial<UserState>) => (state: UserState) => ActionResult<UserState>;
}

/**
 * Is executed if the server successfully returns a token.
 * @param state
 * @param actions
 */
const onSuccess = (state: UserState, actions: UserActions) => (token: string): EmployeeModel => {
  const { employee, exp } = userService.decodeToken(token);
  const employeeModel = new EmployeeModel(employee);

  userService.setToken(token);

  actions.patch({
    token,
    authenticated: true,
    employee: employeeModel,
  });

  actions.scheduleRefresh(exp);

  return employeeModel;
};

export const userActions: ActionsType<UserState, UserActions> = {
  login: credentials => (state, actions) => {
    return userService
      .login(credentials)
      .then(onSuccess(state, actions));
  },

  refresh: () => (state, actions) => {
    return userService
      .refresh()
      .then(onSuccess(state, actions));
  },

  /**
   * IMPORTANT: Timestamps and the TTL config value have to be in unix timestamp.
   * @param expirationTimestamp - unix timestamp (in seconds)
   */
  scheduleRefresh: expirationTimestamp => (_, actions) => {
    const configTtl = process.env.BACKEND_JWT_TOKEN_TTL;
    let scheduleIn = configTtl ? +configTtl : null;
    const now = moment();

    if (expirationTimestamp != null) {
      const expirationDate = moment(expirationTimestamp, 'X');

      if (expirationDate.diff(now) > 0) {
        scheduleIn = Math.round(expirationDate.diff(now) / 1000);
      }
    }

    if (scheduleIn != null) {
      // Schedule 10 percent before expiration (milliseconds)
      const scheduleBeforeExpiration = Math.round(scheduleIn - (scheduleIn * 0.1)) * 1000;

      setTimeout(
        () => {
          actions.refresh();
        },
        scheduleBeforeExpiration,
      );
    }
  },

  restore: () => (_, actions) => {
    return actions
      .refresh()
      .catch(() => {
        actions.patch({
          authenticated: false,
        });
      });
  },

  logout: () => (state) => {
    if (!state.authenticated) {
      throw new Error('User is not authenticated');
    }

    userService.removeToken();

    return {
      authenticated: false,
      employee: null,
    };
  },

  patch: newValues => state => ({
    ...state,
    ...newValues,
  }),
};
