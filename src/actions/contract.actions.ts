import { ContractState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { employeeService } from '../services/EmployeeService';
import { ContractModel } from '../api/dto/contract.model';
import { ContractRequestModel } from '../api/dto/contract.request.model';

export interface ContractActions {
  setLoading: (isLoading: boolean) => (state: ContractState) => ActionResult<ContractState>;
  fetchAll: () => (state: ContractState, actions: ContractActions) => Promise<ContractModel[]>;
  setList: (employees: ContractModel[]) => (state: ContractState) => ActionResult<ContractState>;
  create: (contract: ContractRequestModel) => () => Promise<ContractModel>;
  update: (update: ContractUpdateModel) => () => Promise<ContractModel>;
  delete: (id: string) => () => Promise<void>;
}

interface ContractUpdateModel {
  contract: ContractRequestModel;
  id: string;
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

  create: (contract: ContractRequestModel) => () => {
    return employeeService
      .createContract(contract)
      .then((contract: ContractModel) => {
        return contract;
      });
  },

  update: (update: ContractUpdateModel) => () => {
    const { contract, id } = update;

    return employeeService
      .updateContract(contract, id)
      .then((contract: ContractModel) => {
        return contract;
      });
  },

  delete: (id: string) => () => {
    return employeeService.deleteContract(id);
  },
};
