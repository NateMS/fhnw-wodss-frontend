import { Allocation } from './allocation';
import { AllocationBaseModel } from './allocation.base.model';

export class AllocationModel extends AllocationBaseModel {
  public readonly id?: number | undefined;

  constructor(allocation : Allocation) {
    super(allocation);

    if (allocation.id) {
      this.id = allocation.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }
}
