import { ActionResult, ActionsType } from 'hyperapp';
import {
  ContractForm,
  ContractFormState,
  initContractForm,
  initContractFormState,
} from '../../state/form/contract-form.state';
import { FormControl } from '../../state/form/types';
import { patch, updateValue } from './index';
import { Contract } from '../../api/dto/contract';
import { Actions } from '../index';

interface ListUpdateValue<T> {
  index: number;
  control: FormControl<T>;
}

interface ListSaving {
  index: number;
  isSaving: boolean;
}

interface ListPatch {
  index: number;
  values: {[key: string]: any};
}

export interface ContractFormActions {
  addEmpty: (employeeId: number) => (state: ContractFormState) => ActionResult<ContractFormState>;
  set: (form: ContractForm[]) => () => ActionResult<ContractFormState>;
  remove: (index: number) => (state: ContractFormState) => ActionResult<ContractFormState>;
  updateValue: (update: ListUpdateValue<any>) => (state: ContractFormState) => ActionResult<ContractFormState>;
  patch: (listPatch: ListPatch) => (state: ContractFormState) => ActionResult<ContractFormState>;
  patchAll: (contracts: Contract[]) => (state: ContractFormState) => ActionResult<ContractFormState>;
  reset: () => () => ActionResult<ContractFormState>;
  setSaving: (listSaving: ListSaving) => (state: ContractFormState) => ActionResult<ContractFormState>;
}

export const contractFormActions: ActionsType<ContractFormState, ContractFormActions> = {
  addEmpty: employeeId => (state: ContractFormState) => {
    const form = patch({ employeeId }, initContractForm());

    return {
      list: [...state.list, form],
    };
  },

  set: forms => () => ({ list: [...forms] }),

  remove: index => (state: ContractFormState) => ({
    list: state.list.filter((_, listIndex) => listIndex !== index),
  }),

  updateValue: (update: ListUpdateValue<any>) => (state: ContractFormState) => ({
    list: state.list.map((form, listIndex) => {
      if (listIndex !== update.index) {
        return form;
      }

      return updateValue(update.control, form);
    }),
  }),

  patch: (listPatch: ListPatch) => (state: ContractFormState) => ({
    list: state.list.map((form, listIndex) => {
      if (listIndex !== listPatch.index) {
        return form;
      }

      return patch(listPatch.values, form);
    }),
  }),

  patchAll: (contracts: Contract[]) => (state: ContractFormState) => {
    const list = contracts.map((contract) => {
      const form = initContractForm();

      return patch(contract, form);
    });

    return {
      ...state,
      list,
    };
  },

  reset: () => () => initContractFormState(),

  setSaving: (listSaving: ListSaving) => (state: ContractFormState) => ({
    list: state.list.map((form, listIndex) => {
      if (listIndex !== listSaving.index) {
        return form;
      }

      return {
        ...form,
        isSaving: listSaving.isSaving,
      };
    }),
  }),
};

export const updateContractFormValue = (index: number, actions: ContractFormActions) => (control: FormControl<any>) => {
  actions.updateValue({
    index,
    control,
  });
};

export const removeContractForm = (key: number, actions: Actions) => {
  actions.form.contract.remove(key);
};
