import { Contract } from './contract';
import { ContractBaseModel } from './contract.base.model';

export class ContractModel extends ContractBaseModel {

  public readonly id: number;

  constructor(contract : Contract) {
    super(contract);

    if (contract.id != null) {
      this.id = contract.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }
}
