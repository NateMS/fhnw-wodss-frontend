import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { State } from '../../state';
import { AvatarItem } from '../Avatar/Avatar';
import { getApiErrorToast, getToastMessage } from '../../utils';
import { ContractModel } from '../../api/dto/contract.model';

interface Props {
  state: State;
  actions: Actions;
}

interface EmployeeRow {
  employee: EmployeeModel;
  contracts: ContractModel[];
  actions: Actions;
}

const openEditForm = (event: Event, employee: EmployeeModel, contracts: ContractModel[], actions: Actions): void => {
  event.preventDefault();

  actions.form.contract.patchAll(contracts);
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

const EmployeeListItem: Component<EmployeeRow> = ({ employee, contracts, actions }) => {
  return (
    <tr>
      <td><AvatarItem fullName={employee.fullName} /></td>
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
                onclick={(event: Event) => openEditForm(event, employee, contracts, actions)}
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
  const employees = state.employee.list;
  const contracts = state.contract.list;

  const createEmployeeListItem = (employee: EmployeeModel) => {
    const employeeContracts = contracts!.filter(contract => contract.employeeId === employee.id);

    return <EmployeeListItem key={employee.id} employee={employee} contracts={employeeContracts} actions={actions} />;
  };

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
        {employees && employees.map(employee => createEmployeeListItem(employee))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
