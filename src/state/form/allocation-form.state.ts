import { Moment } from 'moment';
import { BaseForm, FormControl } from './types';
import { durationValidator, selectValidator } from './validators';

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
      validators: [
        selectValidator,
      ],
    },
    employeeId: {
      name: 'employeeId',
      value: null,
      validators: [
        selectValidator,
      ],
    },
    contractId: {
      name: 'contractId',
      value: null,
      validators: [
        selectValidator,
      ],
    },
    startDate: {
      name: 'startDate',
      value: null,
      validators: [
        durationValidator,
      ],
    },
    endDate: {
      name: 'endDate',
      value: null,
      validators: [
        durationValidator,
      ],
    },
    pensumPercentage: {
      name: 'pensumPercentage',
      value: null,
    },
  },
});
