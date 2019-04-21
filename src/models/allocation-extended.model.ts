import { AllocationModel } from '../api/dto/allocation.model';
import { ContractModel } from '../api/dto/contract.model';
import { Allocation } from '../api/dto/allocation';
import { Contract } from '../api/dto/contract';

export class AllocationExtendedModel extends AllocationModel {
  public readonly contract: ContractModel;

  constructor(allocation: Allocation, contract: Contract) {
    super(allocation);

    this.contract = new ContractModel(contract);
  }
}
