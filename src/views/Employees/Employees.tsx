import { Component, h } from 'hyperapp';
import LinkButton from '../../components/LinkButton/LinkButton';
import { ViewProps } from '../ViewProps';
import Button from '../../components/Button/Button';
import EmployeeModalForm from '../../components/EmployeeModalForm/EmployeeModalForm';
import { Actions } from '../../actions';

const showForm: (show: boolean, actions: Actions) => void = (show, actions) => {
  actions.form.updateField({
    formName: 'employee',
    fieldName: 'isOpen',
    value: show,
  });
};

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const employee = state.user.employee!;

  return (
    <div>
      <div className="employees-container">
        <h1 className="title">Employees {employee.firstName}!</h1>
        <Button theme="primary" label="Create" onClick={() => showForm(true, actions)} />
        <LinkButton theme="primary" label="Planning" to="/planning" />
        <LinkButton theme="primary" label="Logout" to="/logout" />
      </div>
      <EmployeeModalForm state={state.form} actions={actions} />
    </div>
  );
};

export default Employees;
