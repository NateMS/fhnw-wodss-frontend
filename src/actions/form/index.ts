import { ActionResult, ActionsType } from 'hyperapp';
import { FormControl, BaseForm, ValidatorFunction } from '../../state/form/types';
import { hasProp } from '../../utils';
import { AuthenticationFormState } from '../../state/form/authentication-form.state';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import { FormState } from '../../state/form';
import { employeeFormActions } from './employee-form.actions';
import { authenticationFormActions } from './authentication-form.actions';
import { ProjectFormState } from '../../state/form/project-form.state';
import { projectFormActions } from './project-form.actions';
import { contractFormActions, ContractFormActions } from './contract-form.actions';
import { AllocationFormState } from '../../state/form/allocation-form.state';
import { allocationFormActions } from './allocation-form.actions';

export interface GenericFormActions<S> {
  patch: (newValues: {[key: string]: any}) => (state: S) => ActionResult<S>;
  updateValue: (updatedControl: FormControl<any>) => (state: S) => ActionResult<S>;
  reset: () => (state: S) => ActionResult<S>;
  setSaving: (isSaving: boolean) => (state: S) => ActionResult<S>;
  setOpen: (isOpen: boolean) => (state: S) => ActionResult<S>;
}

export const setSaving = (isSaving: boolean, state: BaseForm): BaseForm => ({
  ...state,
  isSaving,
});

export const setOpen = (isOpen: boolean, state: BaseForm): BaseForm => ({
  ...state,
  isOpen,
});

export const updateValue = (updatedControl: FormControl<any>, state: BaseForm): BaseForm => {
  const { name } = updatedControl;

  if (!hasProp(state.controls, name)) {
    throw new Error(`There is no '${updatedControl.name}' in form available.`);
  }

  const currentControl = state.controls[name];
  let errors = {};
  let hasErrors = false;

  if (hasProp(currentControl, 'validators')) {
    // Validate control
    currentControl
      .validators
      .forEach((validator: ValidatorFunction<any>) => {
        errors = {
          ...errors,
          ...validator(updatedControl, state),
        };
      });

    hasErrors = Object.keys(errors).length > 0;
  }

  return {
    ...state,
    controls: {
      ...state.controls,
      [updatedControl.name]: {
        ...state.controls[updatedControl.name],
        errors: hasErrors ? errors : undefined,
        value: updatedControl.value,
      },
    },
  };
};

export const patch = (values: {[key: string]: any}, state: BaseForm): BaseForm => {
  const newValues = { ...values };

  Object
    .keys(newValues)
    .forEach((key) => {
      newValues[key] = {
        ...state.controls[key],
        value: newValues[key],
      };
    });

  return {
    ...state,
    controls: {
      ...state.controls,
      ...newValues,
    },
  };
};

export interface FormActions {
  authentication: GenericFormActions<AuthenticationFormState>;
  employee: GenericFormActions<EmployeeFormState>;
  project: GenericFormActions<ProjectFormState>;
  allocation: GenericFormActions<AllocationFormState>;
  contract: ContractFormActions;
}

export const formActions: ActionsType<FormState, FormActions> = {
  authentication: authenticationFormActions,
  employee: employeeFormActions,
  project: projectFormActions,
  contract: contractFormActions,
  allocation: allocationFormActions,
};
