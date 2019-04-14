import { Moment } from 'moment';
import { BaseForm, FormControl } from './types';

export interface ProjectFormState extends BaseForm {
  controls: {
    id: FormControl<string>;
    name: FormControl<string>;
    ftePercentage: FormControl<number>;
    startDate: FormControl<Moment>;
    endDate: FormControl<Moment>;
    projectManagerId: FormControl<string>;
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
