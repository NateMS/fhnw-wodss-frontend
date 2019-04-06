import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { EmployeeModel } from '../../api/dto/employee.model';
import { EmployeeState } from '../../state';
import { Button } from '../Button/Button';
import { Avatar, AvatarItem } from '../Avatar/Avatar';

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
        <AvatarItem  fullName={fullName} />
      </td>
      <td>
        {employee.role && roleNameMap[employee.role]}
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
        <Button label="Edit" theme="primary" />
        <Button label="Delete" theme="danger" />
      </td>
    </tr>
  );
} 

const EmployeeList: Component<Props> = ({ state, actions }) => {
  const employees = state.list;

  return (
    <table class="table">
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