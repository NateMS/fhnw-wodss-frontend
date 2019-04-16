import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { showProjectCreateForm } from '../../actions/form/project-form.actions';
import Button from '../../components/Button/Button';
import { showAllocationCreateForm } from '../../actions/form/allocation-form.actions';
import AllocationModalForm from '../../components/AllocationModalForm/AllocationModalForm';
import { hasAdminRole, hasPrivilegedRole } from '../../utils';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.project.fetchAll();
  actions.contract.fetchAll();
  actions.allocation.fetchAll();
};

export const Planning: Component<ViewProps> = ({ state, actions }) => {
  const userRole = state.user.employee!.role;

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
      {state.form.project.isOpen && <ProjectModalForm state={state} actions={actions} />}
      {state.form.allocation.isOpen && <AllocationModalForm state={state} actions={actions} />}
    </div>
  );
};

export default Planning;
