import { Component, h } from 'hyperapp';
import { ContractModel } from '../../api/dto/contract.model';
import { DATE_FORMAT_STRING } from '../../constants';

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
          `${startDate.format(DATE_FORMAT_STRING)} – ${endDate.format(DATE_FORMAT_STRING)}` :
          '–'
        }
      </td>
      <td>{contract != null ? `${contract.pensumPercentage}%` : '–'}</td>
    </tr>
  );
};

export default ContractListItem;
