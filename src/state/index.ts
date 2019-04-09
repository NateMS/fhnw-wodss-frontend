import { location, LocationState } from '@hyperapp/router';
import { defaultFormState, FormState } from './form/index';
import { EmployeeModel } from '../api/dto/employee.model';
import { Toast } from '../actions/toast.actions';
<<<<<<< HEAD
import { ProjectModel } from '../api/dto/project.model';
import { AllocationModel } from '../api/dto/allocation.model';
import { ContractModel } from '../api/dto/contract.model';
=======
import { ContractModel } from '../api/dto/contract.model';
import { defaultViewState, ViewState } from './view';
>>>>>>> remotes/origin/develop

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
<<<<<<< HEAD
  project: ProjectState;
  allocation: AllocationState;
=======
>>>>>>> remotes/origin/develop
  contract: ContractState;
  toast: ToastState;
  view: ViewState;
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
<<<<<<< HEAD
  project: {
    list: null,
    isLoading: false,
  },
  allocation: {
    list: null,
    isLoading: false,
  },
=======
>>>>>>> remotes/origin/develop
  contract: {
    list: null,
    isLoading: false,
  },
  form: defaultFormState,
  view: defaultViewState,
  toast: {
    list: [],
  },
};
