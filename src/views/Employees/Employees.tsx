import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import Button from '../../components/Button/Button';
import EmployeeModalForm from '../../components/EmployeeModalForm/EmployeeModalForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { Actions } from '../../actions';
import { Spinner } from '../../components/Spinner/Spinner';

const showCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.employee.setOpen(show);
};

const onRender = (actions: Actions): void => {
  actions.employee.fetchAll();
  actions.contract.fetchAll();
  actions.allocation.fetchAll();
  actions.project.fetchAll();
};

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const { filterString } = state.view.employees;
  const isLoading = state.employee.isLoading ||
    state.contract.isLoading ||
    state.project.isLoading ||
    state.allocation.isLoading;

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Employees</h1>
        <div className="view__actions">
          <input
            type="text"
            className="input view__filter"
            placeholder="Filter"
            value={filterString}
            oninput={(e: any) => actions.view.employees.updateFilterString(e.target.value)}
          />
          <Button
            theme="primary"
            label="Create"
            onClick={() => showCreateForm(true, actions)}
          />
        </div>
        {isLoading && <Spinner isLoading={true} />}
        {!isLoading && <EmployeeList state={state} actions={actions} />}
      </div>
      <EmployeeModalForm
        state={state}
        actions={actions}
      />
    </div>
  );
};

export default Employees;
