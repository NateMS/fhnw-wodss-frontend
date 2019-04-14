import { Moment } from 'moment';
import { BaseForm, FormControl } from './types';
import { selectValidator, textRequiredValidator, durationValidator } from './validators';

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
      validators: [
        textRequiredValidator,
      ],
    },
    ftePercentage: {
      name: 'ftePercentage',
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
    projectManagerId: {
      name: 'projectManagerId',
      value: null,
      validators: [
        selectValidator,
      ],
    },
  },
});
