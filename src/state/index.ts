import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form/index';
import { EmployeeModel } from '../api/dto/employee.model';
import { Toast } from '../actions/toast.actions';
import { ProjectModel } from '../api/dto/project.model';
import { AllocationModel } from '../api/dto/allocation.model';
import { ContractModel } from '../api/dto/contract.model';
import { defaultViewState, ViewState } from './view';

export interface ToastState {
  list: Toast[];
}

export interface ContractState {
  list: ContractModel[];
  isLoading: boolean;
}

export interface EmployeeState {
  list: EmployeeModel[];
  isLoading: boolean;
}

export interface ProjectState {
  list: ProjectModel[];
  isLoading: boolean;
}

export interface AllocationState {
  list: AllocationModel[];
  isLoading: boolean;
}

export interface ContractState {
  list: ContractModel[];
  isLoading: boolean;
}

export interface UserState {
  authenticated: boolean | null;
  token: string | null;
  employee: EmployeeModel | null;
}

export interface State {
  location: LocationState;
  user: UserState;
  form: FormState;
  employee: EmployeeState;
  project: ProjectState;
  allocation: AllocationState;
  contract: ContractState;
  toast: ToastState;
  view: ViewState;
}

export const state: State = {
  location: location.state,
  user: {
    token: null,
    authenticated: null,
    employee: null,
  },
  employee: {
    list: [],
    isLoading: false,
  },
  project: {
    list: [],
    isLoading: false,
  },
  allocation: {
    list: [],
    isLoading: false,
  },
  contract: {
    list: [],
    isLoading: false,
  },
  form: defaultFormState,
  view: defaultViewState,
  toast: {
    list: [],
  },
};
