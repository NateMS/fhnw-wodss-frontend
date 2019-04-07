import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { EmployeeState } from '../../state';
import { AvatarItem } from '../Avatar/Avatar';
import { getApiErrorToast, getToastMessage } from '../../utils';

interface Props {
  state: EmployeeState;
  actions: Actions;
}

interface EmployeeRow {
  employee: EmployeeModel;
  actions: Actions;
}

const openEditForm = (event: Event, employee: EmployeeModel, actions: Actions): void => {
  event.preventDefault();

  actions.form.employee.patch({
    ...employee,
  });

  actions.form.employee.setOpen(true);
};

const deleteEmployee = (event: Event, employee: EmployeeModel, actions: Actions): void => {
  event.preventDefault();

  actions.employee
    .delete(employee.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Employee '${employee.fullName}' successfully deleted.`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error deleting employee', error));
    });
};

const EmployeeRows: Component<EmployeeRow> = ({ employee, actions }) => {
  return (
    <tr>
      <td><AvatarItem  fullName={employee.fullName} /></td>
      <td>{employee.roleName}</td>
      <td>{/* #Projects */}</td>
      <td>{/* Pensum */}</td>
      <td>{/* Contracts */}</td>
      <td>
        <div className="dropdown is-right is-hoverable">
          <div className="dropdown-trigger">
            <i className="fas fa-ellipsis-h" />
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => openEditForm(event, employee, actions)}
              >
                Edit
              </a>
              <hr className="dropdown-divider"/>
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => deleteEmployee(event, employee, actions)}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

const EmployeeList: Component<Props> = ({ state, actions }) => {
  const employees = state.list;

  return (
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <td>Employee</td>
          <td>Role</td>
          <td># Projects</td>
          <td>Pensum</td>
          <td>Contract</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {employees && employees.map(e => <EmployeeRows employee={e} actions={actions} />)}
      </tbody>
    </table>
  );
}

export default EmployeeList;
