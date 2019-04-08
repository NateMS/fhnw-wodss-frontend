import { BaseFormState, FormControl } from './types';

export interface ProjectFormState extends BaseFormState {
  controls: {
    id: FormControl<number>;
    name: FormControl<string>;
    ftePercentage: FormControl<number>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
    projectManagerId: FormControl<number>;
  };
}

export const initProjectForm: () => ProjectFormState = () => ({
  isOpen: false,
  isSaving: false,
  controls: {
    id: {
      name: 'id',
      value: null,
    },
    name: {
      name: 'name',
      value: null,
    },
    ftePercentage: {
      name: 'ftePercentage',
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
    projectManagerId: {
      name: 'projectManagerId',
      value: null,
    },
  },
});
