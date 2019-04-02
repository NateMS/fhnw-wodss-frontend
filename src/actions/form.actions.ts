import { ActionResult, ActionsType } from 'hyperapp';
import { FormState, initAuthenticationForm, initEmployeeForm } from '../state/form';
import { hasProp } from '../utils';

export interface FormFieldUpdate {
  formName: string;
  fieldName: string;
  value: any;
}

export interface FormActions {
  updateField: (update: FormFieldUpdate) => (state: FormState) => ActionResult<FormState>;
  reset: (formName: String) => (state: FormState) => ActionResult<FormState>;
}

export const formActions: ActionsType<FormState, FormActions> = {
  /**
   * This updates a field of any form. The form cannot contain nested
   * forms.
   *
   * @param formName
   * @param fieldName
   * @param value
   */
  updateField: ({ formName, fieldName, value }) => (state) => {
    if (!hasProp(state, formName)) {
      throw new Error(`There is no '${formName}' form available.`);
    }

    if (!hasProp(state[formName], fieldName)) {
      throw new Error(`There is no '${fieldName}' in form '${formName}' available.`);
    }

    return Object.assign({}, state, {
      [formName]: Object.assign({}, state[formName], {
        [fieldName]: value,
      }),
    });
  },

  reset: formName => (state) => {
    let initFunction;

    switch (formName) {
      case 'authentication':
        initFunction = initAuthenticationForm;
        break;
      case 'employee':
        initFunction = initEmployeeForm;
        break;
      default:
        throw new Error(`There is no '${formName} form available.`);
    }

    return Object.assign({}, state, {
      [formName]: initFunction(),
    });
  },
};
