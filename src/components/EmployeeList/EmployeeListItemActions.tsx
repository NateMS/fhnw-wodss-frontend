import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import ToolTip from '../ToolTip/ToolTip';
import { EmployeeModel } from '../../api/dto/employee.model';
import { ContractModel } from '../../api/dto/contract.model';
import { deleteEmployee } from '../../actions/form/employee-form.actions';

interface Props {
  employee: EmployeeModel;
  contracts: ContractModel[];
  isDeleteEnabled: boolean;
  isEditEnabled: boolean;
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

const onDeleteClick = (event: Event, employee: EmployeeModel, actions: Actions): void => {
  event.preventDefault();

  deleteEmployee(employee, actions);
};

export const EmployeeListItemActions: Component<Props> = (props) => {
  const { employee, contracts, actions, isDeleteEnabled, isEditEnabled } = props;

  if (isDeleteEnabled === false && isEditEnabled === false) {
    return <div />;
  }

  return (
    <div className="buttons">
      {isEditEnabled && (
        <ToolTip content="Edit" placement="bottom">
          <button
            className="button is-secondary"
            onclick={(event: Event) => openEditForm(event, employee, contracts, actions)}
          >
            <span className="icon">
              <i className="fas fa-edit"/>
            </span>
          </button>
        </ToolTip>
      )}
      {isDeleteEnabled && (
        <ToolTip content="Delete" placement="bottom">
          <button
            className="button"
            onclick={(event: Event) => onDeleteClick(event, employee, actions)}
          >
            <span className="icon">
              <i className="fas fa-trash"/>
            </span>
          </button>
        </ToolTip>
      )}
    </div>
  );
};

export default EmployeeListItemActions;
