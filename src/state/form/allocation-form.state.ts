import { BaseForm, FormControl } from './types';

export interface AllocationFormState extends BaseForm {
  controls: {
    id: FormControl<number>;
    projectId: FormControl<number>;
    employeeId: FormControl<number>;
    contractId: FormControl<number>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
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
