import { AllocationState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { allocationService } from '../services/AllocationService';
import { AllocationModel } from '../api/dto/allocation.model';
import { Actions } from './index';
import { getApiErrorToast, getToastMessage } from '../utils';
import { AllocationFormState } from '../state/form/allocation-form.state';
import { AllocationBaseModel } from '../api/dto/allocation.base.model';

export interface AllocationActions {
  setLoading: (isLoading: boolean) => (state: AllocationState) => ActionResult<AllocationState>;
  fetchAll: () => (state: AllocationState, actions: AllocationActions) => Promise<AllocationModel[]>;
  setList: (allocations: AllocationModel[]) => (state: AllocationState) => ActionResult<AllocationState>;
  create: (form: AllocationFormState) => () => Promise<AllocationModel>;
  update: (form: AllocationFormState) => () => Promise<AllocationModel>;
  delete: (id: string) => () => Promise<void>;
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

  create: (form: AllocationFormState) => () => {
    const { projectId, contractId, pensumPercentage, startDate, endDate } = form.controls;

    // TODO Validation
    const allocation: AllocationBaseModel = {
      projectId: projectId.value!,
      contractId: contractId.value!,
      pensumPercentage: pensumPercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
    };

    return allocationService.create(allocation);
  },

  update: (form: AllocationFormState) => () => {
    const { id, projectId, contractId, pensumPercentage, startDate, endDate } = form.controls;

    // TODO Validation

    const allocation: AllocationBaseModel = {
      projectId: projectId.value!,
      contractId: contractId.value!,
      pensumPercentage: pensumPercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
    };

    return allocationService.update(allocation, id.value!);
  },

  delete: (id: string) => () => {
    return allocationService.delete(id);
  },
};

export const createAllocation = (state: AllocationFormState, actions: Actions): void => {
  actions.form.allocation.setSaving(true);

  actions
    .allocation
    .create(state)
    .then(() => {
      actions.toast.success(getToastMessage(`Successfully created allocation`));
      actions.form.allocation.reset();

      // Refresh underlying view
      actions.allocation.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating allocation', error));
      actions.form.allocation.setSaving(false);
    });
};

export const updateAllocation = (state: AllocationFormState, actions: Actions): void => {
  actions.form.allocation.setSaving(true);

  actions
    .allocation
    .update(state)
    .then(() => {
      actions.toast.success(getToastMessage(`Successfully updated allocation`));
      actions.form.allocation.reset();

      // Refresh underlying view
      actions.allocation.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updating allocation', error));
      actions.form.allocation.setSaving(false);
    });
};
