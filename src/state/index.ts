import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form/index';
import { EmployeeModel } from '../api/dto/employee.model';
import { Toast } from '../actions/toast.actions';
import { ProjectModel } from '../api/dto/project.model';
import { AllocationModel } from '../api/dto/allocation.model';
import { ContractModel } from '../api/dto/contract.model';

export interface ToastState {
  list: Toast[];
}

export interface EmployeeState {
  list: EmployeeModel[] | null;
  isLoading: boolean;
}

export interface ProjectState {
  list: ProjectModel[] | null;
  isLoading: boolean;
}

export interface AllocationState {
  list: AllocationModel[] | null;
  isLoading: boolean;
}

export interface ContractState {
  list: ContractModel[] | null;
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
  project: ProjectState;
  allocation: AllocationState;
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
  project: {
    list: null,
    isLoading: false,
  },
  allocation: {
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
