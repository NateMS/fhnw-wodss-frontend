import { AllocationState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { allocationService } from '../services/AllocationService';
import { AllocationModel } from '../api/dto/allocation.model';
import { AllocationRequestModel } from '../api/dto/allocation.request.model';

export interface AllocationActions {
  setLoading: (isLoading: boolean) => (state: AllocationState) => ActionResult<AllocationState>;
  fetchAll: () => (state: AllocationState, actions: AllocationActions) => Promise<AllocationModel[]>;
  setList: (allocations: AllocationModel[]) => (state: AllocationState) => ActionResult<AllocationState>;
  create: (allocation: AllocationRequestModel) => () => Promise<AllocationModel>;
  update: (update: AllocationUpdateModel) => () => Promise<AllocationModel>;
  delete: (id: string) => () => Promise<void>;
}

interface AllocationUpdateModel {
  allocation: AllocationRequestModel;
  id: string;
}

export const allocationActions: ActionsType<AllocationState, AllocationActions> = {
  setLoading: isLoading => state => (
    Object.assign({}, state, {
      isLoading,
    })
  ),

  setList: allocations => state => (
    Object.assign({}, state, {
      list: [...allocations],
    })
  ),

  fetchAll: () => (_, actions) => {
    actions.setLoading(true);
    allocationService
      .getAll()
      .then((allocations) => {
        actions.setLoading(false);
        actions.setList(allocations);
        return allocations;
      });
  },

  create: (allocation: AllocationRequestModel) => () => {
    return allocationService.create(allocation);
  },

  update: (update: AllocationUpdateModel) => () => {
    const { allocation, id } = update;

    return allocationService.update(allocation, id);
  },

  delete: (id: string) => () => {
    return allocationService.delete(id);
  },
};
