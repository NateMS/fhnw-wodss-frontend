import { Component, h } from 'hyperapp';
import { AvatarItem } from '../Avatar/Avatar';
import { EmployeeModel } from '../../api/dto/employee.model';
import { ProjectModel } from '../../api/dto/project.model';
import { ContractModel } from '../../api/dto/contract.model';
import { Actions } from '../../actions';
import EmployeeListItemActions from './EmployeeListItemActions';
import { formatDateRange } from '../../utils';

interface Props {
  key: string;
  employee: EmployeeModel;
  projects: Set<ProjectModel> | undefined;
  contract: ContractModel | undefined;
  contracts: ContractModel[];
  actions: Actions;
  isEditEnabled: boolean;
  isDeleteEnabled: boolean;
}

export const EmployeeListItem: Component<Props> = (props) => {
  const { employee, projects, contract, contracts, actions, isDeleteEnabled, isEditEnabled } = props;

  const startDate = contract != null ? contract.startDate : undefined;
  const endDate = contract != null ? contract.endDate : undefined;

  return (
    <tr>
      <td><AvatarItem fullName={employee.fullName} /></td>
      <td>{employee.roleName}</td>
      <td>{projects != null ? projects.size : 0}</td>
      <td>{contract != null ? `${contract.pensumPercentage}%` : '–'}</td>
      <td>
        {startDate && endDate ?
          formatDateRange(startDate, endDate) :
          '–'
        }
      </td>
      <td>
        <EmployeeListItemActions
          employee={employee}
          contracts={contracts}
          isDeleteEnabled={isDeleteEnabled}
          isEditEnabled={isEditEnabled}
          actions={actions}
        />
      </td>
    </tr>
  );
};

export default EmployeeListItem;
