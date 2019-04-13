import { ContractState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { ContractForm } from '../state/form/contract-form.state';
import { ContractModel } from '../api/dto/contract.model';
import { Contract } from '../api/dto/contract';
import { getApiErrorToast, getToastMessage } from '../utils';
import { Actions } from './index';
import { removeContractForm } from './form/contract-form.actions';

export interface ContractActions {
  setLoading: (isLoading: boolean) => (state: ContractState) => ActionResult<ContractState>;
  fetchAll: () => (state: ContractState, actions: ContractActions) => Promise<ContractModel[]>;
  setList: (employees: ContractModel[]) => (state: ContractState) => ActionResult<ContractState>;
  create: (form: ContractForm) => () => Promise<ContractModel>;
  update: (form: ContractForm) => () => Promise<ContractModel>;
  delete: (id: number) => () => Promise<void>;
}

export const contractActions: ActionsType<ContractState, ContractActions> = {
  setLoading: isLoading => state => (
    Object.assign({}, state, {
      isLoading,
    })
  ),

  setList: contracts => state => (
    Object.assign({}, state, {
      list: [...contracts],
    })
  ),

  fetchAll: () => (_, actions) => {
    actions.setLoading(true);
    employeeService
      .getAllContracts()
      .then((contracts) => {
        actions.setLoading(false);
        actions.setList(contracts);
        return contracts;
      });
  },

  create: (form: ContractForm) => () => {
    const { startDate, endDate, pensumPercentage, employeeId } = form.controls;
    // @TODO VALIDATION

    const contract: Contract = {
      startDate: startDate.value!,
      endDate: endDate.value!,
      pensumPercentage: pensumPercentage.value!,
      employeeId: employeeId.value!,
    };

    return employeeService
      .createContract(contract)
      .then((contract: ContractModel) => {
        return contract;
      });
  },

  update: (form: ContractForm) => () => {
    const { id, startDate, endDate, pensumPercentage, employeeId } = form.controls;
    // @TODO VALIDATION

    const contract: Contract = {
      id: id.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      pensumPercentage: pensumPercentage.value!,
      employeeId: employeeId.value!,
    };

    return employeeService
      .updateContract(contract)
      .then((contract: ContractModel) => {
        return contract;
      });
  },

  delete: (id: number) => () => {
    return employeeService.deleteContract(id);
  },
};

// TODO RENAME STATE FORM
export const deleteContract = (state: ContractForm, key: number, actions: Actions) => {
  // TODO VALIDATE if id is available
  actions
    .contract
    .delete(state.controls.id.value!)
    .then(() => {
      // TODO add more description to the message
      // TODO move remove contract row?
      removeContractForm(key, actions);
      actions.toast.success(getToastMessage('Contract successfully deleted.'));
      actions.contract.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error deleting contract', error));
    });
};

export const createContract = (state: ContractForm, index: number, actions: Actions) => {
  // TODO VALIDATE
  actions
    .contract
    .create(state)
    .then((contract: ContractModel) => {
      actions.toast.success(getToastMessage(`Contract successfully created`));
      actions.contract.fetchAll();
      actions.form.contract.patch({
        index,
        values: contract,
      });
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating contract', error));
    });
};

// TODO RENAME STATE FORM
export const updateContract = (state: ContractForm, actions: Actions) => {
  actions
    .contract
    .update(state)
    .then(() => {
      // TODO Add more description to the toast
      actions.toast.success(getToastMessage(`Contract successfully updated`));
      actions.contract.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating contract', error));
    });
};