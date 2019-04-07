import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import Button from '../../components/Button/Button';
import EmployeeModalForm from '../../components/EmployeeModalForm/EmployeeModalForm';]
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { Actions } from '../../actions';

const showCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.employee.setOpen(show);
};

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const employee = state.user.employee!;

  return (
    <div oncreate={() => actions.employee.fetchAll()}>
      <div className="employees-container">
        <h1 className="title">Employees {employee.firstName}!</h1>
        {state.employee.isLoading && <div className="is-loading">Loading...</div>}
        <Button theme="primary" label="Create" onClick={() => showCreateForm(true, actions)} />
      </div>
      <EmployeeModalForm state={state.form.employee} actions={actions} />
    </div>
  );
};

export default Employees;
