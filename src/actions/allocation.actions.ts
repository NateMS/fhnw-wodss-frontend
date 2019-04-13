import { AllocationState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { allocationService } from '../services/AllocationService';
import { AllocationModel } from '../api/dto/allocation.model';

export interface AllocationActions {
  setLoading: (isLoading: boolean) => (state: AllocationState) => ActionResult<AllocationState>;
  fetchAll: () => (state: AllocationState, actions: AllocationActions) => Promise<AllocationModel[]>;
  setList: (allocations: AllocationModel[]) => (state: AllocationState) => ActionResult<AllocationState>;
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
};
