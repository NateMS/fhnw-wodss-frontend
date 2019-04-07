import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form/index';
import { EmployeeModel } from '../api/dto/employee.model';
import { Toast } from '../actions/toast.actions';

export interface ToastState {
  list: Toast[];
}

export interface EmployeeState {
  list: EmployeeModel[] | null;
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
  toast: ToastState;
}

export const state: State = {
  location: location.state,
  user: {
    authenticated: false,
    employee: null,
  },
  employee: {
    list: null,
    isLoading: false,
  },
  form: defaultFormState,
  toast: {
    list: [],
  },
};
