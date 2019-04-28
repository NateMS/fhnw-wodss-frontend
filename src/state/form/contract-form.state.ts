import { Moment } from 'moment';
import { BaseForm, FormControl, ListForm } from './types';
import { durationValidator } from './validators';

export interface ContractForm extends BaseForm {
  controls: {
    id: FormControl<string>;
    employeeId: FormControl<string>;
    startDate: FormControl<Moment>;
    endDate: FormControl<Moment>;
    pensumPercentage: FormControl<number>;
  };
}

export type ContractFormState = ListForm<ContractForm>;

export const initContractFormState: () => ContractFormState = () => ({
  list: [],
});

export const initContractForm: () => ContractForm = () => ({
  isOpen: false,
  isSaving: false,
  controls: {
    id: {
      name: 'id',
      value: null,
    },
    employeeId: {
      name: 'employeeId',
      value: null,
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
