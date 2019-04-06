import { ActionResult, ActionsType } from 'hyperapp';
import { UserState } from '../state';
import { Employee } from '../api/dto/employee';
import { EmployeeModel } from '../api/dto/employee.model';
import { Credentials } from '../api/dto/credentials';
import { RoleEnum } from '../api/role.enum';
import { LOCAL_STORAGE_KEY_USER } from '../constants';

export interface UserActions {
  login:
    (credentials: Credentials) =>
    (state: UserState, actions: UserActions) =>
      Promise<Employee>;
  logout: () => (state: UserState) => ActionResult<UserState>;
  setEmployee: (employee: EmployeeModel) => (state: UserState) => ActionResult<UserState>;
}

export const userActions: ActionsType<UserState, UserActions> = {
  login: () => (state, actions) => {
    return new Promise((resolve, reject) => {
      if (state.authenticated) {
        // @TODO Show message
        reject('User is already logged in');
        throw new Error('User is already logged in');
      }

      setTimeout(
        () => {
          const employee = new EmployeeModel({
            id: 1,
            emailAddress: 'kelvin.louis@students.fhnw.ch',
            firstName: 'Kelvin',
            lastName: 'Louis',
            active: true,
            role: RoleEnum.ADMINISTRATOR,
          });

          // @TODO: Replace with real storage procedure
          window.localStorage.setItem('user', JSON.stringify(employee));
          resolve(employee);
          actions.setEmployee(employee);
        },
        2000,
      );
    });
  },

  logout: () => (state) => {
    if (!state.authenticated) {
      throw new Error('User is not authenticated');
    }

    window.localStorage.removeItem(LOCAL_STORAGE_KEY_USER);

    return {
      authenticated: false,
      employee: null,
    };
  },

  setEmployee: employee => (state) => {
    return Object.assign({}, state, {
      employee,
      authenticated: true,
    });
  },
};
