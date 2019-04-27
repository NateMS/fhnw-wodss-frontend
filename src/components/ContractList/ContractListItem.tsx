import { Component, h } from 'hyperapp';
import { ContractModel } from '../../api/dto/contract.model';
import { formatDateRange } from '../../utils';

interface Props {
  key: string;
  contract: ContractModel;
}

export const ContractListItem: Component<Props> = (props) => {
  const { contract } = props;

  const startDate = contract != null ? contract.startDate : undefined;
  const endDate = contract != null ? contract.endDate : undefined;

  return (
    <tr>
      <td>
        {startDate && endDate ?
          formatDateRange(startDate, endDate) :
          '–'
        }
      </td>
      <td>{contract != null ? `${contract.pensumPercentage}%` : '–'}</td>
    </tr>
  );
};

export default ContractListItem;
