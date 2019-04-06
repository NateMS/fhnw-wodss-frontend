import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { EmployeeState } from '../../state';
import { AvatarItem } from '../Avatar/Avatar';

interface Props {
  state: EmployeeState;
  actions: Actions;
}

interface EmployeeRow {
  employee: EmployeeModel;
  actions: Actions;
}

const EmployeeRows: Component<EmployeeRow> = ({employee, actions}) => {
  const fullName = `${employee.firstName} ${employee.lastName}`

  return (
    <tr>
      <td>
        <AvatarItem  fullName={employee.fullName} />
      </td>
      <td>
        {employee.roleName}
      </td>
      <td>
        {/* #Projects */}
      </td>
      <td>
        {/* Pensum */}
      </td>
      <td>
        {/* Contracts */}
      </td>
      <td>
        <div className="dropdown is-right is-hoverable">
          <div className="dropdown-trigger">
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a href="#" class="dropdown-item">
                Edit
              </a>
              <hr class="dropdown-divider"/>
              <a href="#" class="dropdown-item">
                Delete
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

const EmployeeList: Component<Props> = ({ state, actions }) => {
  const employees = state.list;

  return (
    <table class="table is-fullwidth is-hoverable">
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
