import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import Button from '../../components/Button/Button';
import EmployeeModalForm from '../../components/EmployeeModalForm/EmployeeModalForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { Actions } from '../../actions';

const showCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.employee.setOpen(show);
};

const onRender = (actions: Actions): void => {
  actions.employee.fetchAll();
  actions.contract.fetchAll();
};

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const isLoading = state.employee.isLoading || state.contract.isLoading;
  const isComplete = state.employee.list != null && state.contract.list != null;

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="employees-container">
        <h1 className="title">Employees</h1>
        <Button theme="primary" label="Create" onClick={() => showCreateForm(true, actions)} />
        {isLoading && <div className="is-loading">Loading...</div>}
        {isComplete != null && <EmployeeList state={state} actions={actions} />}
      </div>
      <EmployeeModalForm
        state={state}
        actions={actions}
      />
    </div>
  );
};

export default Employees;
