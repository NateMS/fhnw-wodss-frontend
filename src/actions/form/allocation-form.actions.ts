import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { AllocationFormState, initAllocationForm } from '../../state/form/allocation-form.state';
import { Actions } from '../index';
import { getToastMessage, getApiErrorToast } from '../../utils';
import { AllocationRequestModel } from '../../api/dto/allocation.request.model';
import { AllocationModel } from '../../api/dto/allocation.model';
import { ContractModel } from '../../api/dto/contract.model';

export const allocationFormActions: ActionsType<AllocationFormState, GenericFormActions<AllocationFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initAllocationForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};

export const showAllocationCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.allocation.reset();
  actions.form.allocation.setOpen(show);
};

export const showManageAllocationModal = (allocation: AllocationModel, contracts: ContractModel[], actions: Actions) => {
  const contract = contracts.find(c => c.id === allocation.contractId);

  if (contract == null) {
    throw new Error(`ContractModel for id '${allocation.contractId}' should be available`);
  }

  actions.form.allocation.patch({
    ...allocation,
    employeeId: contract.employeeId,
  });

  actions.form.allocation.setOpen(true);
};

export const createAllocation = (state: AllocationFormState, actions: Actions): void => {
  const { projectId, contractId, pensumPercentage, startDate, endDate } = state.controls;
  actions.form.allocation.setSaving(true);

  try {
    const request = new AllocationRequestModel({
      projectId: projectId.value!,
      contractId: contractId.value!,
      pensumPercentage: pensumPercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
    });

    actions
      .allocation
      .create(request)
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
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error creating allocation', error));
    actions.form.allocation.setSaving(false);
  }
};

export const updateAllocation = (state: AllocationFormState, actions: Actions): void => {
  const { id, projectId, contractId, pensumPercentage, startDate, endDate } = state.controls;
  actions.form.allocation.setSaving(true);

  try {
    const request = new AllocationRequestModel({
      projectId: projectId.value!,
      contractId: contractId.value!,
      pensumPercentage: pensumPercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
    });

    if (id.value == null) {
      throw Error(`'ID' is missing`);
    }

    actions
      .allocation
      .update({ allocation: request, id: id.value })
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
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error updating allocation', error));
    actions.form.allocation.setSaving(false);
  }
};

export const removeAllocation = (id: string, actions: Actions): void => {
  actions.form.allocation.setSaving(true);

  actions
    .allocation
    .delete(id)
    .then(() => {
      actions.toast.success(getToastMessage(`Successfully deleted allocation`));
      actions.form.allocation.reset();

      // Refresh underlying view
      actions.allocation.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error deleting allocation', error));
      actions.form.allocation.setSaving(false);
    });
};
