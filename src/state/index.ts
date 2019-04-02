import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form';
import { EmployeeModel } from '../api/dto/employee.model';

export interface EmployeeState {
  list: EmployeeModel[];
  isLoading: boolean;
}

export interface UserState {
  authenticated: boolean;
  employee: EmployeeModel | null;
}

export interface State {
  location: LocationState;
  user: UserState;
  form: FormState;
  employee: EmployeeState;
}

export const state: State = {
  location: location.state,
  user: {
    authenticated: false,
    employee: null,
  },
  employee: {
    list: null,
    isLoading: null,
  },
  form: defaultFormState,
};
