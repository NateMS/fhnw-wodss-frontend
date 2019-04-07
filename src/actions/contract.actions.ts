import { ContractState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { ContractForm } from '../state/form/contract-form.state';
import { ContractModel } from '../api/dto/contract.model';
import { Contract } from '../api/dto/contract';

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
