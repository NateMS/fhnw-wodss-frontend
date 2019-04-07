import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form/index';
import { EmployeeModel } from '../api/dto/employee.model';
import { Toast } from '../actions/toast.actions';
import { ContractModel } from '../api/dto/contract.model';

export interface ToastState {
  list: Toast[];
}

export interface ContractState {
  list: ContractModel[] | null;
  isLoading: boolean;
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
  contract: ContractState;
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
  contract: {
    list: null,
    isLoading: false,
  },
  form: defaultFormState,
  toast: {
    list: [],
  },
};
