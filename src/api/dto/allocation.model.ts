import { Allocation } from "./allocation";

export class AllocationModel implements Allocation {
  public readonly id?: number | undefined;  
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly contractId: number;
  public readonly projectId: number;

  constructor(allocation : Allocation) {
    this.id = allocation.id;

    if (allocation.startDate) {
      this.startDate = allocation.startDate;
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (allocation.endDate) {
      this.endDate = allocation.endDate;
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (allocation.pensumPercentage) {
      this.pensumPercentage = allocation.pensumPercentage;
    } else {
      throw new Error(`The field 'pensumPercentage' is missing.`);
    }

    if (allocation.contractId) {
      this.contractId = allocation.contractId;
    } else {
      throw new Error(`The field 'contractId' is missing.`);
    }

    if (allocation.projectId) {
      this.projectId = allocation.projectId;
    } else {
      throw new Error(`The field 'projectId' is missing.`);
    }
  }
}
