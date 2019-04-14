import { Moment } from 'moment';
import { BaseForm, FormControl } from './types';

export interface AllocationFormState extends BaseForm {
  controls: {
    id: FormControl<string>;
    projectId: FormControl<string>;
    employeeId: FormControl<string>;
    contractId: FormControl<string>;
    startDate: FormControl<Moment>;
    endDate: FormControl<Moment>;
    pensumPercentage: FormControl<number>;
  };
}

export const initAllocationForm: () => AllocationFormState = () => ({
  isOpen: false,
  isSaving: false,
  controls: {
    id: {
      name: 'id',
      value: null,
    },
    projectId: {
      name: 'projectId',
      value: null,
    },
    employeeId: {
      name: 'employeeId',
      value: null,
    },
    contractId: {
      name: 'contractId',
      value: null,
    },
    startDate: {
      name: 'startDate',
      value: null,
    },
    endDate: {
      name: 'endDate',
      value: null,
    },
    pensumPercentage: {
      name: 'pensumPercentage',
      value: null,
    },
  },
});
