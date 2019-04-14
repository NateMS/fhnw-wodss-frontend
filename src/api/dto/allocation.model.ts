import { Allocation } from './allocation';
import { AllocationBaseModel } from './allocation.base.model';

export class AllocationModel extends AllocationBaseModel {
  public readonly id?: string | undefined;

  constructor(allocation: Allocation) {
    super(allocation);

    if (allocation.id) {
      this.id = allocation.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }
}
