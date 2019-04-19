import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { showProjectCreateForm } from '../../actions/form/project-form.actions';
import Button from '../../components/Button/Button';
import { showAllocationCreateForm } from '../../actions/form/allocation-form.actions';
import { formatDateRange, hasAdminRole, hasPrivilegedRole } from '../../utils';
import AllocationModalForm from '../../components/AllocationModalForm/AllocationModalForm';
import { AllocationModel } from '../../api/dto/allocation.model';
import { ContractModel } from '../../api/dto/contract.model';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.project.fetchAll();
  actions.contract.fetchAll();
  actions.allocation.fetchAll();
};

const showManageAllocationModal = (allocation: AllocationModel, contracts: ContractModel[], actions: Actions) => {
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

export const Planning: Component<ViewProps> = ({ state, actions }) => {
  const userRole = state.user.employee!.role;

  const allocations = state.allocation.list;
  const contracts = state.contract.list;

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Planning</h1>
        {hasAdminRole(userRole) && (
          <Button
            theme="primary"
            label="Create Project"
            onClick={() => showProjectCreateForm(true, actions)}
          />
        )}

        {hasPrivilegedRole(userRole) && (
          <Button
            theme="primary"
            label="Create Allocation"
            onClick={() => showAllocationCreateForm(true, actions)}
          />
        )}
      </div>
      <ul>
        { allocations.map(allocation => (
          <li onclick={() => showManageAllocationModal(allocation, contracts, actions)}>
            {allocation.id} / {formatDateRange(allocation.startDate, allocation.endDate)}
          </li>
        ))}
      </ul>
      {state.form.project.isOpen && <ProjectModalForm state={state} actions={actions} />}
      {state.form.allocation.isOpen && <AllocationModalForm state={state} actions={actions} />}
    </div>
  );
};

export default Planning;
