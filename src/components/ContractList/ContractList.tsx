import { Component, h } from 'hyperapp';
import { State } from '../../state';
import { ContractModel } from '../../api/dto/contract.model';
import ContractListItem from './ContractListItem';

interface Props {
  state: State;
}

const ContractList: Component<Props> = ({ state }) => {
  const employee = state.user.employee!;

  const contracts = state.contract.list;
  const employeeContracts = contracts!.filter(contract => contract.employeeId === employee.id);

  const createContarctListItem = (contract: ContractModel) => {
    return (
      <ContractListItem
        key={contract.id}
        contract={contract}
      />
    );
  };

  return (
    <div className="contract-list">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <td>Duration</td>
            <td>Percentage</td>
          </tr>
        </thead>
        <tbody>
          {
            employeeContracts.length === 0 ?
            <tr><td colspan="2">No contracts</td></tr> :
            employeeContracts.map(contract => createContarctListItem(contract))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;
