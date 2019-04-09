import { BaseForm, FormControl, ListForm } from './types';

export interface ContractForm extends BaseForm {
  controls: {
    id: FormControl<number>;
    employeeId: FormControl<number>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
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
