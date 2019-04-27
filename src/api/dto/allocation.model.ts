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

  public static createMapByContractId(allocations: AllocationModel[]): Map<string, Set<AllocationModel>> {
    const map: Map<string, Set<AllocationModel>> = new Map();

    allocations.forEach((allocation) => {
      const { contractId } = allocation;

      if (!map.has(contractId)) {
        map.set(contractId, new Set());
      }

      const set = map.get(contractId);
      set!.add(allocation);
    });

    return map;
  }
}
